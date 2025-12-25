import Link from "@bradgarropy/next-link"
import { Cable, Linkedin, Twitter, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Cable className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">VoltRFP</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Empowering FMEG manufacturing leaders with multi-agent AI orchestration. Precise technical mapping, strategic search, and bulletproof pricing.
            </p>
            <div className="flex gap-4">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Strategic Search</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Technical Mapping</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Cost Analysis</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">FMEG Enterprise</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">OEM Partners</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">RFP Consultants</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Government Tenders</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Security Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 VoltRFP Orchestration Systems. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground italic">
            Engineered for high-voltage precision.
          </p>
        </div>
      </div>
    </footer>
  )
}
