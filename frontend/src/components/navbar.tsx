import Link from "@bradgarropy/next-link"
import { Button } from "@/components/ui/button"
import { Cable } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Cable className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">VoltRFP</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">Solutions</Link>
          <Link to="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</Link>
          <Link to="#enterprise" className="text-sm font-medium hover:text-primary transition-colors">Enterprise</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/signup">
            <Button variant="ghost" className="text-sm font-medium">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button className="text-sm font-medium rounded-full px-6">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
