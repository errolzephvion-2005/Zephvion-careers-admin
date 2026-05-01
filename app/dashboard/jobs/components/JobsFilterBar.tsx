import React from 'react';

interface JobsFilterBarProps {
  searchQuery: string
  setSearchQuery: (q: string) => void
  activeFilter: 'all' | 'enabled' | 'disabled'
  setActiveFilter: (f: 'all' | 'enabled' | 'disabled') => void
  typeFilter: 'all' | 'technical' | 'non-technical'
  setTypeFilter: (f: 'all' | 'technical' | 'non-technical') => void
  compact?: boolean
}

export default function JobsFilterBar({
  searchQuery, setSearchQuery,
  activeFilter, setActiveFilter,
  typeFilter, setTypeFilter,
  compact = false
}: JobsFilterBarProps) {
  return (
    <div className={`glass glass-border glow-primary flex flex-col relative z-10 shrink-0 ${compact ? 'p-3 md:p-4 mb-2 gap-3' : 'p-4 md:p-6 mb-8 gap-4 overflow-hidden'}`}>
      {!compact && <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />}
      <div className={`flex relative z-10 ${compact ? 'flex-col gap-3' : 'flex-col md:flex-row gap-4'}`}>
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className={`text-on-surface-variant group-focus-within:text-primary transition-colors ${compact ? 'h-4 w-4' : 'h-5 w-5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={compact ? "SEARCH JOBS..." : "SEARCH KEYWORD, FIELD, REF CODE..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`block w-full bg-surface-lowest border border-outline-variant/30 text-on-surface placeholder-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary font-mono uppercase tracking-wider transition-all ${compact ? 'pl-9 pr-8 py-2 text-[10px]' : 'pl-10 pr-10 py-3 text-sm'}`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-primary transition-colors"
            >
              <svg className={`fill-none ${compact ? 'h-4 w-4' : 'h-5 w-5'}`} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className={`flex items-center overflow-x-auto hide-scrollbar ${compact ? 'gap-2' : 'gap-4 pb-2 md:pb-0'}`}>
          <div className={`relative ${compact ? 'min-w-[120px]' : 'min-w-[160px]'}`}>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value as any)}
              className={`block w-full appearance-none bg-surface-lowest border border-outline-variant/30 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary font-mono uppercase tracking-wider transition-all cursor-pointer ${compact ? 'py-2 pl-2 pr-6 text-[9px]' : 'py-3 pl-4 pr-10 text-sm'}`}
            >
              <option value="all">ALL STATUSES</option>
              <option value="enabled">ACTIVE ONLY</option>
              <option value="disabled">INACTIVE ONLY</option>
            </select>
            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center text-on-surface-variant ${compact ? 'px-2' : 'px-4'}`}>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>

          <div className={`relative ${compact ? 'min-w-[120px]' : 'min-w-[160px]'}`}>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className={`block w-full appearance-none bg-surface-lowest border border-outline-variant/30 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary font-mono uppercase tracking-wider transition-all cursor-pointer ${compact ? 'py-2 pl-2 pr-6 text-[9px]' : 'py-3 pl-4 pr-10 text-sm'}`}
            >
              <option value="all">ALL TYPES</option>
              <option value="technical">TECHNICAL</option>
              <option value="non-technical">NON-TECHNICAL</option>
            </select>
            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center text-on-surface-variant ${compact ? 'px-2' : 'px-4'}`}>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
