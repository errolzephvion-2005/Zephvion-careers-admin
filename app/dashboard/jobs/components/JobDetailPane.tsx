import React from 'react';

interface JobDetailPaneProps {
  selectedJob: any
  onClose: () => void
  onOpenMobileList: () => void
}

const DetailSection = ({ title, content }: { title: string, content: React.ReactNode }) => {
  if (!content) return null
  return (
    <div className="mb-10">
      <h3 className="text-[clamp(1.125rem,2.5vw,1.75rem)] font-bold font-mono uppercase tracking-[0.15em] text-on-surface mb-6 flex items-center gap-4">
        <span className="w-12 h-[1px] bg-primary/40"></span>
        {title}
      </h3>
      <div className="text-base md:text-lg font-medium text-on-surface-variant whitespace-pre-wrap leading-relaxed pl-16 border-l-2 border-primary/20">
        {content}
      </div>
    </div>
  )
}

export default function JobDetailPane({ selectedJob, onClose, onOpenMobileList }: JobDetailPaneProps) {
  if (!selectedJob) return null

  return (
    <div className="flex-1 glass glass-border flex-col relative flex min-w-0">
      <div className="flex-1 p-4 sm:p-5 md:p-8 flex flex-col min-w-0">
        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-6 self-start">
          {/* Mobile Drawer Toggle */}
          <button
            onClick={onOpenMobileList}
            className="md:hidden text-[10px] font-mono uppercase tracking-widest text-on-surface flex items-center gap-2 hover:bg-surface-low px-3 py-2 rounded-sm border border-outline-variant/30 transition-colors bg-surface-lowest"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            Menu
          </button>

          {/* Back Button */}
          <button
            onClick={onClose}
            className="text-[10px] font-mono uppercase tracking-widest text-primary flex items-center gap-2 hover:bg-primary/10 px-3 py-2 rounded-sm border border-primary/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Jobs Grid
          </button>
        </div>

        {/* Detail Header */}
        <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 sm:gap-6 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-outline-variant/30">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>{selectedJob.category || 'General'}</span>
              <span className="w-1 h-1 bg-primary/50 rounded-full"></span>
              <span>{selectedJob.job_type === 'technical' ? 'Technical' : 'Non-Technical'}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tighter text-on-surface break-all leading-tight">
              {selectedJob.job_title}
            </h1>
          </div>

          {selectedJob.is_trending && (
            <div className="flex gap-2 shrink-0 h-[36px] items-center">
              <div className="px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(163,201,255,0.15)]">
                <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">Trending</span>
              </div>
            </div>
          )}
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-16 bg-surface-lowest/50 border border-outline-variant/30 p-6 sm:p-10 shadow-xl">
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-[11px] font-mono text-primary uppercase tracking-[0.2em] font-bold">Job ID / Ref</span>
            <span className="text-base font-mono text-on-surface break-all">{selectedJob.job_reference_code}</span>
          </div>
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-[11px] font-mono text-primary uppercase tracking-[0.2em] font-bold">Experience</span>
            <span className="text-base font-medium text-on-surface break-words">{selectedJob.work_experience}</span>
          </div>
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-[11px] font-mono text-primary uppercase tracking-[0.2em] font-bold">Location</span>
            <span className="text-base font-medium text-on-surface break-words">{selectedJob.location || 'N/A'}</span>
          </div>
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-[11px] font-mono text-primary uppercase tracking-[0.2em] font-bold">Priority Status</span>
            <span className={`text-base font-bold uppercase tracking-widest break-words ${selectedJob.status === 'OPEN' || selectedJob.status === 'NEW' ? 'text-green-500' : selectedJob.status === 'CRITICAL-REQUIREMENT' ? 'text-orange-500 animate-pulse' : 'text-red-500'}`}>
              {selectedJob.status}
            </span>
          </div>
        </div>

        {/* Detail Sections */}
        <DetailSection title="Educational Requirements" content={selectedJob.educational_requirements} />
        <DetailSection title="Service Line" content={selectedJob.service_line} />
        <DetailSection title="Responsibilities" content={selectedJob.responsibilities} />
        <DetailSection title="Preferred Skills" content={selectedJob.preferred_skills} />
        <DetailSection title="Additional Information" content={selectedJob.additional_information} />

      </div>
    </div>
  )
}
