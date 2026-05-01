import Skeleton from '@/shared/components/Skeleton'

export default function ApplicationDetailLoading() {
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

      <section className="p-4 md:p-8 grid-bg flex-1 w-full overflow-hidden">
        <div className="max-w-5xl mx-auto glass glass-border p-6 md:p-10 shadow-2xl relative w-full overflow-hidden">
          
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-outline-variant/30 pb-6">
            <div className="flex-1 min-w-0 space-y-4">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-full max-w-xl h-14 md:h-16" />
            </div>
            <Skeleton className="w-32 h-10 shrink-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-10">
              <div className="space-y-4">
                <Skeleton className="w-32 h-3 uppercase tracking-widest opacity-60" />
                <Skeleton className="w-full h-14" />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Skeleton className="w-24 h-2 opacity-50" />
                  <Skeleton className="w-full h-8" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="w-24 h-2 opacity-50" />
                  <Skeleton className="w-full h-8" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-outline-variant/20">
                <Skeleton className="w-48 h-3" />
                <div className="flex gap-3">
                  <Skeleton className="w-10 h-10" />
                  <Skeleton className="w-10 h-10" />
                  <Skeleton className="w-10 h-10" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="glass glass-border p-6 space-y-6">
                <Skeleton className="w-full h-40" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-full h-24" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
