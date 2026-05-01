import Skeleton from '@/shared/components/Skeleton'

export default function JobsLoading() {
  return (
    <main className="min-h-screen bg-surface flex flex-col font-sans relative">
      <div className="h-20 border-b border-outline-variant/30 flex items-center justify-between px-4 md:px-8 bg-surface/80 backdrop-blur-md">
        <Skeleton className="w-32 h-8" />
        <div className="hidden md:flex gap-6">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full md:hidden" />
      </div>

      <section className="grid-bg flex-1 flex flex-col mx-auto w-full p-4 md:p-8 max-w-7xl">
        {/* Header Block Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4 flex-1">
            <Skeleton className="w-64 h-14 md:h-16" />
            <div className="hidden md:block h-[2px] flex-1 bg-outline-variant opacity-30" />
          </div>
          <div className="flex items-center gap-6">
            <Skeleton className="w-24 h-4 opacity-50" />
            <Skeleton className="w-44 h-12" />
          </div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="glass glass-border p-4 mb-8 flex flex-wrap gap-4 items-center">
          <Skeleton className="flex-1 min-w-[200px] h-10" />
          <Skeleton className="w-40 h-10" />
          <Skeleton className="w-40 h-10" />
        </div>

        {/* Grid View Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass glass-border p-6 h-[280px] flex flex-col">
              <div className="flex flex-col mb-6">
                <Skeleton className="w-24 h-3 mb-2" />
                <Skeleton className="w-16 h-3" />
              </div>
              <Skeleton className="w-full h-8 mb-4" />
              <Skeleton className="w-3/4 h-4 mb-8" />
              <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                <Skeleton className="w-28 h-3" />
                <Skeleton className="w-16 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
