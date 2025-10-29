"use client"

import { useEffect, useState } from "react"

type Partner =
  | string
  | {
      name: string
      logo?: string // Ruta relativa en /public, por ejemplo "/partners/acme.png"
      url?: string  // Enlace externo; abre en nueva pestaña
    }

interface LogoCarouselProps {
  partners: Partner[]
}

export function LogoCarousel({ partners }: LogoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!partners || partners.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length)
    }, 2000) // Cambia cada 2 segundos

    return () => clearInterval(interval)
  }, [partners.length])

  if (!partners || partners.length === 0) {
    return null
  }

  const resolved = partners.map((p) =>
    typeof p === "string" ? { name: p, logo: undefined } : p,
  )

  return (
    <div className="relative overflow-hidden h-48">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {resolved.map((partner, index) => {
          const card = (
            <div className="w-72 h-40 bg-muted/20 rounded-xl flex flex-col items-center justify-center border border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden shadow-sm">
              <img
                src={partner.logo || "/placeholder-logo.png"}
                alt={partner.name}
                className="max-h-16 object-contain px-4"
                loading="lazy"
                draggable={false}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/placeholder-logo.png"
                }}
              />
              <div className="text-xs mt-2 text-muted-foreground text-center px-3 truncate w-full" title={partner.name}>
                {partner.name}
              </div>
            </div>
          )

          return (
            <div key={`${partner.name}-${index}`} className="flex-shrink-0 w-full flex items-center justify-center px-4">
              {partner.url ? (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir sitio de ${partner.name}`}
                >
                  {card}
                </a>
              ) : (
                card
              )}
            </div>
          )
        })}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {resolved.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Mostrar ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
