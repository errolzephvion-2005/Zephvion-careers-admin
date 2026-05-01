import Skeleton from '@/shared/components/Skeleton'

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-surface flex flex-col font-sans relative">
      {/* Navbar Placeholder */}
      <div className="h-20 border-b border-outline-variant/30 flex items-center justify-between px-4 md:px-8 bg-surface/80 backdrop-blur-md">
        <Skeleton className="w-32 h-8" />
        <div className="hidden md:flex gap-6">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full md:hidden" />
      </div>

      <section className="p-4 md:p-8 grid-bg flex-1">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Title Placeholder */}
          <Skeleton className="w-64 h-14" />

          {/* Stats Cards Grid Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass glass-border p-6 h-32 flex flex-col justify-between">
                <Skeleton className="w-24 h-3" />
                <Skeleton className="w-16 h-8" />
              </div>
            ))}
          </div>

          {/* Main Content Areas Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="w-full h-96 glass glass-border" />
            </div>
            <div className="space-y-6">
              <Skeleton className="w-full h-48 glass glass-border" />
              <Skeleton className="w-full h-48 glass glass-border" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
