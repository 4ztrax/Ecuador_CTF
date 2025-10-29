"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)

    if (element) {
      const headerOffset = 100 // Increased offset for better positioning
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/ecuador-flag.jpg"
              alt="Bandera de Ecuador"
              className="w-10 h-7 object-cover rounded-sm shadow-sm border border-border/50"
              loading="lazy"
              draggable={false}
              onError={(e) => {
                // Oculta la imagen si el recurso no existe
                ;(e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
            <span className="font-bold text-lg">CTF 2025</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("categorias")}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Categorías
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Cómo funciona
            </button>
            <button
              onClick={() => scrollToSection("registro")}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Inscripción
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <Button onClick={() => scrollToSection("registro")} className="hidden md:inline-flex">
              Inscríbete
            </Button>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("categorias")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Categorías
              </button>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Cómo funciona
              </button>
              <button
                onClick={() => scrollToSection("registro")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Inscripción
              </button>
              <Button onClick={() => scrollToSection("registro")} className="w-full">
                Inscríbete
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
