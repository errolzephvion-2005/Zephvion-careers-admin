'use client'



interface SortFilterMenuProps {
  isOpen: boolean
  onClose: () => void
  sortBy: 'date' | 'job'
  setSortBy: (val: 'date' | 'job') => void
  jobFilter: string | null
  setJobFilter: (val: string | null) => void
  jobSearchQuery: string
  setJobSearchQuery: (val: string) => void
  availableJobTitles: string[]
  isMobile?: boolean
}

export default function SortFilterMenu({
  isOpen,
  onClose,
  sortBy,
  setSortBy,
  jobFilter,
  setJobFilter,
  jobSearchQuery,
  setJobSearchQuery,
  availableJobTitles,
  isMobile = false
}: SortFilterMenuProps) {
  if (!isOpen) return null

  const filteredTitles = availableJobTitles.filter(title =>
    title.toLowerCase().includes(jobSearchQuery.toLowerCase())
  )

  const content = (
    <div className="flex flex-col flex-1">
      <div className="p-4">
        <div className="text-[9px] font-mono text-on-surface-variant uppercase tracking-widest mb-3 opacity-60">Sort By</div>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => { setSortBy('date'); onClose(); }}
            className={`text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest border transition-colors ${sortBy === 'date' ? 'text-primary border-primary/50 bg-primary/5' : 'text-on-surface border-outline-variant/30 hover:border-primary/30'}`}
          >
            Applied Date
          </button>
          <button 
            onClick={() => { setSortBy('job'); onClose(); }}
            className={`text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest border transition-colors ${sortBy === 'job' ? 'text-primary border-primary/50 bg-primary/5' : 'text-on-surface border-outline-variant/30 hover:border-primary/30'}`}
          >
            Job Position
          </button>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div className="w-full mt-2 border-t border-outline-variant/30 animate-in slide-in-from-top-2 duration-300">
        <div className="bg-[#0A0A0A] flex flex-col">
          {content}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-2 w-64 max-h-[80vh] bg-surface border border-outline-variant shadow-2xl z-50 overflow-hidden glass flex flex-col">
        {content}
      </div>
    </>
  )
}
