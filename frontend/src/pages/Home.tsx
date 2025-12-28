"use client"

import { useState } from "react"
// import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

// ========== AGENTS DATA ==========
const agents = [
  {
    title: "Sales Agent",
    description: "Finds and evaluates RFP opportunities from multiple sources",
    icon: "📧",
    color: "from-blue-500/10 to-blue-600/10",
  },
  {
    title: "Technical Agent",
    description: "Extracts SKUs and technical specs from OEM product sheets",
    icon: "⚙️",
    color: "from-purple-500/10 to-purple-600/10",
  },
  {
    title: "Pricing Agent",
    description: "Calculates costs, material usage, and testing expenses",
    icon: "💰",
    color: "from-emerald-500/10 to-emerald-600/10",
  },
]

// ========== FEATURES DATA ==========
const features = [
  {
    title: "Intelligent RFP Scanning",
    description: "AI reads and understands complex RFP documents in seconds",
    icon: "🔍",
  },
  {
    title: "SKU Extraction",
    description: "Automatically extracts product specifications from OEM sheets",
    icon: "📋",
  },
  {
    title: "Automatic Costing",
    description: "Real-time cost calculations with material and testing breakdown",
    icon: "💹",
  },
  {
    title: "Time Reduction",
    description: "Reduce response time from days to hours with full automation",
    icon: "⚡",
  },
  {
    title: "Team Coordination",
    description: "Seamless collaboration between sales, technical, and pricing",
    icon: "👥",
  },
  {
    title: "Centralized Dashboard",
    description: "All RFPs and responses in one organized, searchable interface",
    icon: "📊",
  },
]

// ========== BENEFITS DATA ==========
const benefits = [
  { metric: "70%", label: "Faster RFP Response Time" },
  { metric: "90%", label: "Accuracy Rate" },
  { metric: "3x", label: "More RFPs Handled" },
  { metric: "100%", label: "Data Security" },
]

const footerLinks = {
  Product: ["Features", "Pricing", "Security", "Roadmap"],
  Company: ["About Us", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
}

// ========== NAVBAR SECTION ==========
function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10)
    })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full border-b border-border transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-background"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">RFP</span>
            </div>
            <span className="hidden sm:inline font-semibold text-foreground">RFP Automation</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#product" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Product
            </a>
            <a href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Use Cases
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="cursor-pointer">
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate("/signup")} className="cursor-pointer">Get Started</Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

// ========== HERO SECTION ==========
function Hero() {

  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="home" className="relative overflow-hidden bg-background px-4 py-20 sm:py-32 lg:px-8">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance"
          >
            Automate RFP Responses with <span className="text-primary">Multi-Agent AI</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
          >
            Reduce RFP response time by 70%. Coordinate your sales, technical, and pricing teams seamlessly with
            intelligent AI agents. Get accurate quotes in hours, not days.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="px-8 cursor-pointer" onClick={() => navigate("/signup")} >
              Try it Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 rounded-xl border border-border bg-card p-8 overflow-hidden"
          >
            {/* IMAGE CONTAINER */}
            <div className="h-fit rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src="/hero_img.png"
                alt="AI Multi-Agent Orchestration"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            {/* CAPTION BELOW IMAGE */}
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Multi-Agent AI Orchestration Platform
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ========== HOW IT WORKS SECTION ==========
function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="product" className="relative px-4 py-20 sm:py-32 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            How Multi-Agent Orchestration Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Three specialized AI agents work together to automate your entire RFP response workflow
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {agents.map((agent, index) => (
            <div key={index} className="relative">
              <motion.div variants={itemVariants}>
                <Card className="h-full border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div
                      className={`inline-flex items-center justify-center h-12 w-12 rounded-lg bg-linear-to-br ${agent.color} mb-4`}
                    >
                      <span className="text-2xl">{agent.icon}</span>
                    </div>
                    <CardTitle className="text-foreground">{agent.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{agent.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              {/* {index < agents.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 text-primary/50 transform translate-x-8">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7m0 0l-7 7m7-7H6" />
                  </svg>
                </div>
              )} */}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground max-w-3xl mx-auto">
            When an RFP arrives, all three agents work in parallel, each focusing on their expertise. Results are
            instantly compiled into a comprehensive, accurate response ready for your team to review and send.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ========== FEATURES SECTION ==========
function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="use-cases" className="relative px-4 py-20 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Powerful Features for FMEG Companies
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to streamline RFP responses and win more business
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border border-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ========== WHY CHOOSE US SECTION ==========
function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="pricing" className="relative overflow-hidden px-4 py-20 sm:py-32 lg:px-8 bg-primary/5">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Why Choose Us for FMEG Companies
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Specifically designed for the unique challenges of the wires and cables manufacturing industry
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                <span className="text-3xl font-bold text-primary">
                  <motion.h1
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="text-6xl font-extrabold text-blue-600 mt-6"
                  >{benefit.metric}</motion.h1>  
                </span>
              </div>
              <p className="text-foreground font-semibold">{benefit.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-36"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-6">For Sales Teams</h3>
            <div className="space-y-3">
              {["Find opportunities faster", "Track all RFPs in one place", "Instant proposal generation"].map(
                (benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.div>
                ),
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-6">For Technical & Pricing Teams</h3>
            <div className="space-y-3">
              {["Reduced manual data entry", "Accurate cost calculations", "Improved quote consistency"].map(
                (benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ========== FOOTER SECTION ==========
function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="relative border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          <motion.div variants={itemVariants} className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">RFP</span>
              </div>
              <span className="font-semibold text-foreground">RFP Automation</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Multi-Agent AI orchestration platform for automating RFP responses.
            </p>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} RFP Automation. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ========== MAIN HOME COMPONENT ==========
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <WhyChooseUs />
      <Footer />
    </main>
  )
}
