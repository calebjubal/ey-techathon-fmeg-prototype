export function Stats() {
  const stats = [
    { label: "Hours saved per RFP", value: "48h" },
    { label: "SKU Mapping Accuracy", value: "99.9%" },
    { label: "Revenue Opportunity", value: "3.2x" },
    { label: "Cost Analysis Depth", value: "100%" },
  ]

  return (
    <section className="border-y border-border bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className="text-3xl md:text-4xl font-bold tracking-tighter text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground font-medium mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
