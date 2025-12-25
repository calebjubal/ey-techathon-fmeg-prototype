import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Cog, DollarSign, ArrowRightLeft } from "lucide-react"

export function MultiAgentSystem() {
  const agents = [
    {
      title: "Strategic Sales Agent",
      description: "Scans global RFP databases and identifies high-probability opportunities matching your manufacturing capacity.",
      icon: Search,
      role: "Strategic Search",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Technical SKU Agent",
      description: "Automated extraction of technical specifications from OEM data sheets. Maps requirements to internal SKU catalogs instantly.",
      icon: Cog,
      role: "Data Extraction",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Pricing & Costing Agent",
      description: "Calculates total cost consumption including product testing, site-specific logistics, and raw material index adjustments.",
      icon: DollarSign,
      role: "Cost Analysis",
      color: "text-green-500",
      bg: "bg-green-500/10"
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">The Multi-Agent Workflow</h2>
          <p className="text-muted-foreground max-w-2xl text-balance">
            Our specialized agents communicate in real-time to build a cohesive, accurate, and competitive proposal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (visible on desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 -z-10" />
          
          {agents.map((agent, index) => (
            <Card key={index} className="relative bg-background border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${agent.bg}`}>
                  <agent.icon className={`h-6 w-6 ${agent.color}`} />
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{agent.role}</div>
                <CardTitle className="text-xl">{agent.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {agent.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 max-w-4xl">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-background">
                <Search className="h-4 w-4 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center border-2 border-background">
                <Cog className="h-4 w-4 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center border-2 border-background">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="font-medium">Reduced Response Time by 85%</p>
              <p className="text-sm text-muted-foreground">Agents resolve technical queries and pricing blocks in parallel, ensuring you never miss a submission deadline.</p>
            </div>
            <ArrowRightLeft className="h-8 w-8 text-primary/40 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
