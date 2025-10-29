"use client"

import { Header } from "@/components/header"
import { Particles } from "@/components/particles"
import { Countdown } from "@/components/countdown"
import { TerminalText } from "@/components/terminal-text"
import { LogoCarousel } from "@/components/logo-carousel"
import { ScrollNavigation } from "@/components/scroll-navigation"
import { BrevoForm } from "@/components/brevo-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Globe, Search, Lock, Puzzle, ArrowRight, Github, MessageCircle } from "lucide-react"

export default function Home() {
  const categories = [
    { name: "Web", icon: Globe, description: "Vulnerabilidades en aplicaciones web" },
    { name: "Forense", icon: Search, description: "Análisis de evidencia digital" },
    { name: "Cryptography", icon: Lock, description: "Criptografía y cifrado" },
    { name: "Pwned", icon: Shield, description: "Explotación de sistemas" },
    { name: "Miscellaneous", icon: Puzzle, description: "Desafíos diversos" },
  ]

  const partners = [
    "DTEEI UIO",
    "Carrera de Computación",
    { name: "Academia de Ciberseguridad", logo: "/partners/academia.png" },
    { name: "WONCY Latam", logo: "/partners/womcy.png" },
    "DTTI UPS",
    "DTCC UPS",
  ]

  const steps = [
    { title: "Registro", description: "Completa el formulario de inscripción" },
    { title: "Acceso", description: "Recibe las credenciales de la plataforma" },
    { title: "Competencia 24h", description: "Resuelve desafíos durante 24 horas" },
    { title: "Premiación", description: "Ceremonia de reconocimiento" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollNavigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Particles />

        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[20vw] font-bold text-muted/5 select-none text-shadow-lg">UPS CTF 2025</h1>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
              <TerminalText
                text="Torneo Internacional de Ciberseguridad UPS 2025"
                className="text-4xl md:text-6xl font-bold"
                speed={50}
              />
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
              Compite con los mejores en el desafío de ciberseguridad más importante del año
            </p>
            <div className="text-lg text-muted-foreground mb-8">📅 7 de noviembre de 2025</div>
          </div>

          <div className="mb-12">
            <Countdown />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" })}
            >
              ¡Quiero participar!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" asChild>
                <a href="#" target={"#" === "#" ? undefined : "_blank"} rel={"#" === "#" ? undefined : "noopener noreferrer"}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Telegram
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#" target={"#" === "#" ? undefined : "_blank"} rel={"#" === "#" ? undefined : "noopener noreferrer"}>
                  <Github className="mr-2 h-5 w-5" />
                  Repo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Categorías Oficiales</h2>
            <p className="text-muted-foreground text-lg">
              Demuestra tus habilidades en diferentes áreas de la ciberseguridad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Card
                key={category.name}
                className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <category.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Resumen Ejecutivo</h2>
          </div>

          <div className="prose prose-lg prose-invert mx-auto">
            <p className="text-muted-foreground leading-relaxed text-lg">
              La Universidad Politécnica Salesiana del Ecuador (UPS), en alianza con la Academia de Ciberseguridad de
              México y WONCY Latam – Women in Cybersecurity, propone la realización del Torneo Internacional de
              Ciberseguridad UPS 2025 (CTF) en noviembre de 2025. El evento reunirá a estudiantes de universidades de
              Ecuador en un espacio competitivo y formativo de alto nivel. La Academia de Ciberseguridad levantará toda
              la infraestructura en la nube y la certificación mediante insignias digitales mientras que la UPS brindará
              el soporte institucional y articulación académica. WONCY Latam sumará un componente de inclusión y
              diversidad, posicionando el torneo con impacto social y académico.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Instancias Vinculadas</h2>
            <p className="text-muted-foreground text-lg">Organizaciones que hacen posible este evento</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <LogoCarousel partners={partners} />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo Funciona</h2>
            <p className="text-muted-foreground text-lg">Proceso simple para participar en el torneo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="registro" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Registro Simple</h2>
            <p className="text-muted-foreground text-lg">Completa el formulario para participar en el torneo</p>
          </div>

          <BrevoForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">UPS</span>
              </div>
              <span className="font-bold text-lg">CTF 2025</span>
            </div>
            <p className="text-muted-foreground mb-4">
              © 2025 Universidad Politécnica Salesiana. Todos los derechos reservados.
            </p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Contacto
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
