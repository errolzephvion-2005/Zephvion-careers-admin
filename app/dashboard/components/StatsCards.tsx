'use client'

interface Stat {
  label: string
  value: string
  color: string
}

interface StatsCardsProps {
  stats: Stat[]
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <section className="px-4 md:px-8 py-8 grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="glass glass-border p-6 glow-primary group hover:bg-surface-lowest/50 transition-all duration-300">
              <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-[0.2em] mb-4 group-hover:text-primary transition-colors">
                {stat.label}
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl md:text-6xl font-display ${stat.color} tracking-tight`}>
                  {stat.value}
                </span>
              </div>
              <div className="mt-4 h-[1px] w-full bg-outline-variant/30 relative overflow-hidden">
                 <div className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
