"use client"

import { useState, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollNavigation() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY
      setIsVisible(scrolled > 300)
      setIsAtTop(scrolled < 100)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const scrollToNext = () => {
    const sections = ["categorias", "como-funciona", "registro"]
    const currentSection = sections.find((id) => {
      const element = document.getElementById(id)
      if (element) {
        const rect = element.getBoundingClientRect()
        return rect.top > -100 && rect.top < window.innerHeight / 2
      }
      return false
    })

    if (currentSection) {
      const currentIndex = sections.indexOf(currentSection)
      const nextIndex = (currentIndex + 1) % sections.length
      const nextElement = document.getElementById(sections[nextIndex])
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Si no estamos en ninguna sección específica, ir a la primera
      document.getElementById("categorias")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <Button
        size="icon"
        variant="outline"
        className="rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        onClick={scrollToTop}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>

      {!isAtTop && (
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          onClick={scrollToNext}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
