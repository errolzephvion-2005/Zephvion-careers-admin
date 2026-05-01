import Skeleton from '@/shared/components/Skeleton'

export default function LoginLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-surface relative overflow-hidden">
      {/* Background Dots Placeholder */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="w-full max-w-md glass glass-border p-6 md:p-10 glow-primary relative z-10 overflow-hidden">
        <header className="mb-10 text-center">
          <Skeleton className="w-56 h-20 mx-auto mb-2" />
          <Skeleton className="w-40 h-4 mx-auto opacity-50" />
        </header>

        <div className="space-y-8">
          <div className="space-y-3">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-12" />
          </div>
          
          <div className="space-y-3">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-12" />
          </div>

          <Skeleton className="w-full h-14 mt-6" />
        </div>
      </div>
    </main>
  )
}
