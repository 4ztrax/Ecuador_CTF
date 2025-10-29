import { NextResponse } from 'next/server'

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email)
}

function sanitizePhone(cc: string, phone: string) {
  const digits = (cc + phone).replace(/\D/g, '')
  return digits
}

export async function POST(req: Request) {
  try {
    const { name, email, university, countryCode, phone } = await req.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Email inválido' }, { status: 400 })
    }
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ ok: false, error: 'Nombre requerido' }, { status: 400 })
    }
    if (!university || typeof university !== 'string') {
      return NextResponse.json({ ok: false, error: 'Universidad/Organización requerida' }, { status: 400 })
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID

    if (!BREVO_API_KEY) {
      return NextResponse.json({ ok: false, error: 'Configuración del servidor incompleta' }, { status: 500 })
    }

    let listId: number | undefined
    if (BREVO_LIST_ID !== undefined && BREVO_LIST_ID !== '') {
      const parsed = parseInt(String(BREVO_LIST_ID), 10)
      if (!Number.isNaN(parsed)) listId = parsed
    }

    const sms = phone ? sanitizePhone(countryCode || '', phone) : undefined
    const validSms = sms && /^[1-9][0-9]{5,18}$/.test(sms) ? sms : undefined

    const UNIVERSITY_ATTR = process.env.BREVO_UNIVERSITY_ATTRIBUTE || 'MOTIVO'

    const payload: any = {
      email,
      attributes: {
        FIRSTNAME: name,
        [UNIVERSITY_ATTR]: university,
      },
      updateEnabled: true,
    }

    if (listId !== undefined) {
      payload.listIds = [listId]
    }

    let warning: string | undefined
    if (sms) {
      if (validSms) {
        payload.attributes.SMS = validSms
      } else {
        warning = 'SMS omitido por formato inválido'
      }
    }

    // DRY RUN mode: short-circuit without calling Brevo
    const DRY_RUN = String(process.env.BREVO_DRY_RUN || '').toLowerCase() === 'true'
    if (DRY_RUN) {
      return NextResponse.json({ ok: true, dryRun: true, payloadPreview: payload })
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
      // Do not cache sensitive requests
      cache: 'no-store',
    })

    if (!res.ok) {
      // Read body ONCE
      let detail: any = null
      let msg: string = ''
      try {
        detail = await res.json()
        msg = (detail && (detail.message || detail.error)) || ''
      } catch {
        detail = await res.text()
        msg = typeof detail === 'string' ? detail : ''
      }

      // If attribute for university is unknown, retry without it or with COMPANY
      if (res.status === 400 && /attribute/i.test(msg) && /(unknown|invalid|not\s*found|does\s*not\s*exist)/i.test(msg)) {
        const attrless: any = {
          email,
          attributes: { FIRSTNAME: name },
          updateEnabled: true,
        }
        if (validSms) attrless.attributes.SMS = validSms
        if (listId !== undefined) attrless.listIds = [listId]

        const re1 = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify(attrless),
          cache: 'no-store',
        })
        if (re1.ok) return NextResponse.json({ ok: true, warning: 'Atributo de universidad no reconocido; omitido' })

        // try with COMPANY attribute as fallback
        const withCompany: any = {
          ...attrless,
          attributes: { FIRSTNAME: name, COMPANY: university },
        }
        if (validSms) withCompany.attributes.SMS = validSms
        const re2 = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify(withCompany),
          cache: 'no-store',
        })
        if (re2.ok) return NextResponse.json({ ok: true, warning: 'Usado atributo COMPANY como fallback' })
        const d2 = await re2.text()
        return NextResponse.json({ ok: false, error: 'Error al registrar (atributo no válido)', detail: d2 }, { status: 502 })
      }

      // If contact exists, update it instead (idempotent upsert)
      if (res.status === 400 && typeof msg === 'string' && /exist/i.test(msg)) {
        const updatePayload: any = {
          attributes: payload.attributes,
          updateEnabled: true,
        }
        if (listId !== undefined) {
          updatePayload.listIds = [listId]
        }
        const up = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify(updatePayload),
          cache: 'no-store',
        })
        if (up.ok) {
          return NextResponse.json({ ok: true, updated: true, warning })
        }
        const t = await up.text()
        return NextResponse.json({ ok: false, error: 'Error al actualizar contacto', detail: t }, { status: 502 })
      }

      return NextResponse.json({ ok: false, error: 'Error al registrar', detail }, { status: 502 })
    }

    return NextResponse.json({ ok: true, warning })
  } catch (err: any) {
    console.error('[subscribe] Unexpected error:', err)
    return NextResponse.json({ ok: false, error: 'Error inesperado', detail: err?.message }, { status: 500 })
  }
}
