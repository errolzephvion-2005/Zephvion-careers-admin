import Skeleton from '@/shared/components/Skeleton'

export default function ApplicationsLoading() {
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
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="space-y-2">
              <Skeleton className="w-64 h-12" />
              <Skeleton className="w-32 h-3 opacity-50" />
            </div>
            <Skeleton className="w-full md:max-w-md h-12" />
          </div>

          {/* List Skeleton */}
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass glass-border p-5 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-12 h-12 bg-surface-lowest flex items-center justify-center shrink-0">
                  <Skeleton className="w-12 h-12" />
                </div>
                
                <div className="flex-1 min-w-0 w-full space-y-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="w-48 h-6" />
                    <Skeleton className="w-24 h-4" />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-40 h-4" />
                    <Skeleton className="w-24 h-4" />
                  </div>
                </div>

                <Skeleton className="w-32 h-11 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
