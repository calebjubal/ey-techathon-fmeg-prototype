import Link from "@bradgarropy/next-link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/20 bg-primary/5 text-primary animate-in fade-in slide-in-from-bottom-3 duration-500">
          Announcing VoltRFP v2.0 for FMEG Enterprises
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-balance">
          Automate RFP Responses for <span className="text-primary italic">Wires & Cables</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl text-balance leading-relaxed">
          Orchestrate specialized AI agents to streamline Sales strategy, Technical SKU extraction, and Pricing analysis in minutes, not weeks.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup">
            <Button size="lg" className="rounded-full px-8 text-base h-12">
              Try it Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12">
            <Play className="mr-2 h-4 w-4 fill-current" /> Watch Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
