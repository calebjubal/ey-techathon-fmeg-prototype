import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MultiAgentSystem } from "@/components/multi-agent-system"
import { Stats } from "@/components/stats"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <MultiAgentSystem />
      </main>
      <Footer />
    </div>
  )
}