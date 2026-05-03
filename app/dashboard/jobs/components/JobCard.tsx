import React from 'react'

interface JobCardProps {
  job: any
  isSelected?: boolean
  onSelect: (job: any) => void
  onToggle: (job: any) => void
  onEdit: (job: any) => void
  onDelete: (job: any) => void
  onToggleTrending: (job: any) => void
}

export default function JobCard({ job, isSelected, onSelect, onToggle, onEdit, onDelete, onToggleTrending }: JobCardProps) {
  return (
    <div
      className={`glass p-6 flex flex-col relative group transition-all duration-300 border ${!job.is_active ? 'opacity-60 grayscale-[0.5]' : ''} ${isSelected ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(163,201,255,0.15)]' : 'border-outline-variant hover:bg-surface-lowest/50'}`}
    >
      {/* Top Rounded Action Bar */}
      <div className="flex flex-wrap items-center justify-between bg-surface-lowest/80 rounded-2xl md:rounded-full px-4 py-2.5 border border-outline-variant/50 mb-5 relative z-10 shadow-sm gap-y-2">
        <label className="flex items-center gap-2 cursor-pointer group" onClick={(e) => e.stopPropagation()}>
          <div className="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              checked={!!job.is_trending}
              onChange={(e) => {
                onToggleTrending(job)
              }}
              className="peer appearance-none w-3.5 h-3.5 border border-outline-variant/50 rounded-sm checked:bg-primary checked:border-primary cursor-pointer transition-colors"
            />
            <svg className="w-2.5 h-2.5 absolute text-on-primary pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors select-none">Trending</span>
        </label>

        <div className="flex flex-wrap items-center gap-3 justify-end flex-1 min-w-fit">
          {/* Toggle Switch */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggle(job)
            }}
            className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${job.is_active ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}
            title={job.is_active ? 'Disable Job' : 'Enable Job'}
          >
            <div className={`absolute top-[2px] w-2.5 h-2.5 rounded-full transition-all duration-300 ${job.is_active ? 'left-[18px] bg-green-500' : 'left-[2px] bg-red-500'}`} />
          </button>

          <div className="w-[1px] h-3 bg-outline-variant/50 max-[260px]:hidden"></div>

          <div className="flex items-center gap-3">
            {/* Edit Icon */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onEdit(job)
              }}
              className="text-on-surface-variant hover:text-primary transition-colors"
              title="Edit Job"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>

            {/* Delete Icon */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDelete(job)
              }}
              className="text-on-surface-variant hover:text-red-500 transition-colors"
              title="Delete Job"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] flex flex-col mb-4 min-w-0">
        <span className="truncate">{job.category || 'General'}</span>
        <span className="text-on-surface-variant/60 mt-1 truncate">{job.job_type === 'technical' ? 'TECH' : 'NON-TECH'}</span>
      </div>

      <div onClick={() => onSelect(job)} className="flex-1 flex flex-col group cursor-pointer mt-2 min-w-0">
        <h3 className="text-xl font-display uppercase tracking-widest text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2 break-all">
          {job.job_title}
        </h3>

        <div className="text-xs text-on-surface-variant font-mono mb-6 line-clamp-2 break-words">
          {job.location} • {job.work_experience}
        </div>

        <div className="mt-auto pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-2 min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant truncate min-w-0">
            {job.job_reference_code}
          </div>
          <div className={`text-[10px] font-bold uppercase tracking-widest shrink-0 ${job.status === 'OPEN' || job.status === 'NEW' ? 'text-green-500' : job.status === 'CRITICAL-REQUIREMENT' ? 'text-orange-500 animate-pulse' : 'text-red-500'}`}>
            {job.status}
          </div>
        </div>
      </div>
    </div>
  )
}
