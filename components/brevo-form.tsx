"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BrevoForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [university, setUniversity] = useState("")
  const [countryCode, setCountryCode] = useState("+593")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, university, countryCode, phone }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        const msg = data?.detail?.message || data?.detail || data?.error || "No se pudo registrar"
        throw new Error(msg)
      }
      if (data?.dryRun) {
        setSuccess("Modo prueba activo: datos recibidos localmente, no se envió a Brevo.")
      } else {
        const warn = data?.warning ? ` (${data.warning})` : ""
        setSuccess(`¡Registro completado! Revisa tu correo.${warn}`)
      }
      setName("")
      setEmail("")
      setUniversity("")
      setCountryCode("+593")
      setPhone("")
    } catch (err: any) {
      setError((err && err.message) || "Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-6">
        <p className="text-muted-foreground mb-6">
          Compite con los mejores en el desafío de ciberseguridad más importante del año.
        </p>

        {success && (
          <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-300 px-4 py-3 text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-1">
              Nombre completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={200}
              autoComplete="name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <Label htmlFor="university" className="mb-1">
              Universidad/Organización
            </Label>
            <Input
              id="university"
              type="text"
              placeholder="Tu universidad u organización"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
              maxLength={200}
              autoComplete="organization"
            />
          </div>

          <div>
            <Label className="mb-1">Teléfono (opcional)</Label>
            <div className="flex gap-2">
              <select
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={!phone}
              >
                <option value="+593">+593 EC</option>
                <option value="+54">+54 AR</option>
                <option value="+57">+57 CO</option>
                <option value="+56">+56 CL</option>
                <option value="+52">+52 MX</option>
                <option value="+51">+51 PE</option>
                <option value="+598">+598 UY</option>
                <option value="+1">+1 US</option>
                <option value="+34">+34 ES</option>
              </select>
              <Input
                type="tel"
                inputMode="numeric"
                pattern="^[0-9]{7,15}$"
                maxLength={15}
                placeholder="987654321"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                autoComplete="tel"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Enviando…' : 'Registrarse ahora'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">CTF 2025 - UPS</p>
      </div>
    </div>
  )
}
