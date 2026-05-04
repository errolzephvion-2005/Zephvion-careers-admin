'use client'

import { useState } from 'react'
import SortFilterMenu from './SortFilterMenu'

interface ApplicationsToolbarProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  selectedCount: number
  totalVisible: number
  onToggleSelectAll: () => void
  sortBy: 'date' | 'job'
  setSortBy: (val: 'date' | 'job') => void
  jobFilter: string | null
  setJobFilter: (val: string | null) => void
  jobSearchQuery: string
  setJobSearchQuery: (val: string) => void
  availableJobTitles: string[]
  isSortMenuOpen: boolean
  setIsSortMenuOpen: (val: boolean) => void
  isExportMenuOpen: boolean
  setIsExportMenuOpen: (val: boolean) => void
  sortOrder: 'asc' | 'desc'
  setSortOrder: (val: 'asc' | 'desc') => void
  isOrderToggleVisible: boolean
  onResetSort: () => void
  onSortChange: (val: 'date' | 'job') => void
  onDeleteClick: () => void
  onExport: (format: 'csv' | 'xlsx') => void
}

export default function ApplicationsToolbar({
  searchQuery,
  setSearchQuery,
  selectedCount,
  totalVisible,
  onToggleSelectAll,
  sortBy,
  setSortBy,
  jobFilter,
  setJobFilter,
  jobSearchQuery,
  setJobSearchQuery,
  availableJobTitles,
  isSortMenuOpen,
  setIsSortMenuOpen,
  isExportMenuOpen,
  setIsExportMenuOpen,
  sortOrder,
  setSortOrder,
  isOrderToggleVisible,
  onResetSort,
  onSortChange,
  onDeleteClick,
  onExport
}: ApplicationsToolbarProps) {
  const [isJobInputFocused, setIsJobInputFocused] = useState(false)
  const isAllSelected = selectedCount === totalVisible && totalVisible > 0

  return (
    <>
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative glass glass-border p-1 md:p-2">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search applications by name, job title, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:outline-none text-on-surface font-mono text-sm placeholder:text-on-surface-variant/50"
          />
        </div>
      </div>

      {/* Action Toolbar - Desktop */}
      <div className="hidden md:flex mb-8 items-center justify-between gap-4 py-2 px-1">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <div
                onClick={onToggleSelectAll}
                className={`w-5 h-5 border-2 transition-all duration-300 flex items-center justify-center rounded-[2px] ${isAllSelected ? 'border-primary bg-primary' : 'border-outline-variant group-hover:border-primary/50 bg-transparent'
                  }`}
              >
                {isAllSelected && (
                  <svg className="w-3.5 h-3.5 text-on-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {selectedCount > 0 && !isAllSelected && (
                  <div className="w-2.5 h-[2px] bg-primary" />
                )}
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant group-hover:text-primary transition-colors">
              {selectedCount > 0 ? `${selectedCount} Selected` : 'Select All'}
            </span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          {sortBy === 'date' && isOrderToggleVisible && (
            <div className="flex items-center gap-2 border border-outline-variant p-1 bg-surface-low/30 animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setSortOrder('asc')}
                className={`px-2 py-1 text-[9px] font-mono uppercase tracking-tighter transition-all ${sortOrder === 'asc' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                ASC
              </button>
              <button
                onClick={() => setSortOrder('desc')}
                className={`px-2 py-1 text-[9px] font-mono uppercase tracking-tighter transition-all ${sortOrder === 'desc' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                DESC
              </button>
            </div>
          )}

          {sortBy === 'job' && (
            <div className="relative animate-in fade-in zoom-in duration-200 group">
              <div className={`flex items-center border bg-surface-low/30 overflow-hidden transition-colors ${isJobInputFocused ? 'border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.1)]' : 'border-outline-variant'}`}>
                <input
                  type="text"
                  placeholder="Filter by job..."
                  value={jobSearchQuery}
                  onChange={(e) => {
                    const val = e.target.value
                    setJobSearchQuery(val)
                    if (val === '') setJobFilter(null)
                  }}
                  onFocus={() => {
                    setIsJobInputFocused(true)
                    if (!jobSearchQuery) setJobSearchQuery('')
                  }}
                  onBlur={() => {
                    // Small delay to allow clicking recommendations
                    setTimeout(() => setIsJobInputFocused(false), 200)
                  }}
                  className="w-48 bg-transparent px-3 py-2 text-[10px] font-mono text-on-surface focus:outline-none placeholder:text-on-surface-variant/30"
                />
                <div className={`p-2 border-l border-outline-variant transition-colors cursor-default ${isJobInputFocused ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Recommendation List */}
              {(isJobInputFocused && !jobFilter) && (
                <div className="absolute top-full left-0 w-full bg-[#0F0F0F] border border-outline-variant mt-1 shadow-2xl z-[100] max-h-60 overflow-y-auto hide-scrollbar animate-in slide-in-from-top-1 duration-200">
                  {availableJobTitles.filter(t => t.toLowerCase().includes(jobSearchQuery.toLowerCase())).length > 0 ? (
                    availableJobTitles
                      .filter(t => t.toLowerCase().includes(jobSearchQuery.toLowerCase()))
                      .map(title => (
                        <button
                          key={title}
                          onClick={() => {
                            setJobFilter(title)
                            setJobSearchQuery(title)
                            setIsJobInputFocused(false)
                          }}
                          className="w-full text-left px-3 py-2 text-[9px] font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary hover:bg-primary/5 border-b border-outline-variant/10 last:border-0 transition-colors"
                        >
                          {title}
                        </button>
                      ))
                  ) : (
                    <div className="px-3 py-2 text-[9px] font-mono uppercase text-on-surface-variant/40">No matches</div>
                  )}
                </div>
              )}

              {/* Active Filter Badge */}
              {jobFilter && (
                <div className="absolute -top-2 -right-2 bg-primary text-on-primary text-[7px] font-bold px-1.5 py-0.5 rounded-full shadow-lg animate-in zoom-in duration-200">
                  ACTIVE
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 border transition-all ${isSortMenuOpen ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/40 hover:bg-surface-low'}`}
              >
                <div className={`transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-0' : 'rotate-180'}`}>
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface">
                  {sortBy === 'date' ? 'Date' : 'Position'}
                </span>
              </button>
              <SortFilterMenu
                isOpen={isSortMenuOpen}
                onClose={() => setIsSortMenuOpen(false)}
                sortBy={sortBy}
                setSortBy={onSortChange}
                jobFilter={jobFilter}
                setJobFilter={setJobFilter}
                jobSearchQuery={jobSearchQuery}
                setJobSearchQuery={setJobSearchQuery}
                availableJobTitles={availableJobTitles}
              />
            </div>

            {(sortBy !== 'date' || sortOrder !== 'desc' || isOrderToggleVisible || jobFilter) && (
              <button
                onClick={onResetSort}
                className="p-2 border border-outline-variant hover:border-red-500/40 hover:bg-red-500/5 text-on-surface-variant hover:text-red-400 transition-all animate-in fade-in zoom-in duration-200"
                title="Reset Sort"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="relative">
            <button
              disabled={selectedCount === 0}
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className={`flex items-center gap-2 px-3 py-2 border transition-all duration-300 ${selectedCount > 0 ? 'border-outline-variant hover:border-blue-500/40 hover:bg-blue-500/5' : 'border-outline-variant/30 opacity-40 cursor-not-allowed'}`}
            >
              <svg className={`w-4 h-4 ${selectedCount > 0 ? 'text-blue-400' : 'text-on-surface-variant'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface">Export</span>
            </button>
            {isExportMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsExportMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-outline-variant shadow-2xl z-50 overflow-hidden glass">
                  <div className="px-4 py-2 border-b border-outline-variant/30 text-[9px] font-mono text-on-surface-variant uppercase tracking-widest opacity-60">Choose Format</div>
                  <button 
                    onClick={() => { onExport('csv'); setIsExportMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-on-surface hover:bg-blue-500/10 transition-colors border-b border-outline-variant/10"
                  >
                    CSV Spreadsheet
                  </button>
                  <button 
                    onClick={() => { onExport('xlsx'); setIsExportMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-on-surface hover:bg-blue-500/10 transition-colors"
                  >
                    Excel (XLSX)
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            disabled={selectedCount === 0}
            onClick={onDeleteClick}
            className={`flex items-center gap-2 px-3 py-2 border transition-all duration-300 ${selectedCount > 0 ? 'border-outline-variant hover:border-red-500/40 hover:bg-red-500/5' : 'border-outline-variant/30 opacity-40 cursor-not-allowed'}`}
          >
            <svg className={`w-4 h-4 ${selectedCount > 0 ? 'text-red-400' : 'text-on-surface-variant'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface">Delete</span>
          </button>
        </div>
      </div>

      <div className="md:hidden flex flex-col gap-4 mb-6">
        <div className="glass glass-border p-4 flex flex-col gap-4 relative">
          {/* Use flex-wrap and gap-y to handle narrow screens (like 290px) */}
          <div className="flex flex-wrap items-center justify-between gap-y-3">
            <div className="flex flex-wrap items-center gap-2 w-full">
              <div className="flex flex-col w-full border border-outline-variant bg-surface-low/30 overflow-hidden rounded-sm">
                {sortBy === 'date' && isOrderToggleVisible && (
                  <div className="flex items-center w-full border-b border-outline-variant/30 bg-black/20 p-1">
                    <div className="flex w-full bg-surface-low/50 rounded-[4px] p-0.5 border border-outline-variant/20">
                      <button
                        onClick={() => setSortOrder('asc')}
                        className={`flex-1 py-1.5 text-[9px] font-mono uppercase tracking-tighter transition-all rounded-[3px] ${sortOrder === 'asc' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        ASC
                      </button>
                      <button
                        onClick={() => setSortOrder('desc')}
                        className={`flex-1 py-1.5 text-[9px] font-mono uppercase tracking-tighter transition-all rounded-[3px] ${sortOrder === 'desc' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        DESC
                      </button>
                    </div>
                  </div>
                )}

                {sortBy === 'job' && (
                  <div className="flex flex-col w-full relative">
                    <div className="flex items-center border-b border-outline-variant/30 bg-black/20">
                      <input 
                        type="text" 
                        placeholder="Filter by job..."
                        value={jobSearchQuery}
                        onChange={(e) => {
                          const val = e.target.value
                          setJobSearchQuery(val)
                          if (val === '') setJobFilter(null)
                        }}
                        onFocus={() => setIsJobInputFocused(true)}
                        onBlur={() => setTimeout(() => setIsJobInputFocused(false), 200)}
                        className="w-full bg-transparent px-3 py-2 text-[10px] font-mono text-on-surface focus:outline-none placeholder:text-on-surface-variant/30"
                      />
                    </div>
                    
                    {/* Mobile Recommendations - Now positioned to cover below content correctly */}
                    {(isJobInputFocused && !jobFilter) && (
                      <div className="absolute top-full left-0 w-full bg-[#111111] border border-outline-variant shadow-2xl z-[110] max-h-48 overflow-y-auto animate-in slide-in-from-top-1">
                        {availableJobTitles.filter(t => t.toLowerCase().includes(jobSearchQuery.toLowerCase())).map(title => (
                          <button
                            key={title}
                            onClick={() => {
                              setJobFilter(title)
                              setJobSearchQuery(title)
                              setIsJobInputFocused(false)
                            }}
                            className="w-full text-left px-3 py-2.5 text-[9px] font-mono uppercase text-on-surface-variant hover:text-primary hover:bg-primary/5 border-b border-outline-variant/10"
                          >
                            {title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button 
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                  className={`px-3 py-2 text-[10px] font-mono uppercase tracking-widest transition-colors w-full text-center ${isSortMenuOpen ? 'bg-primary text-on-primary' : 'text-on-surface bg-surface-low/30'}`}
                >
                  {sortBy === 'date' ? 'Date' : 'Position'}
                </button>
              </div>

              {(sortBy !== 'date' || sortOrder !== 'desc' || isOrderToggleVisible || jobFilter) && (
                <button
                  onClick={onResetSort}
                  className="p-2 border border-outline-variant text-on-surface-variant hover:text-red-400 animate-in fade-in zoom-in duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <SortFilterMenu
            isOpen={isSortMenuOpen}
            onClose={() => setIsSortMenuOpen(false)}
            sortBy={sortBy}
            setSortBy={onSortChange}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
            jobSearchQuery={jobSearchQuery}
            setJobSearchQuery={setJobSearchQuery}
            availableJobTitles={availableJobTitles}
            isMobile={true}
          />

          {selectedCount > 0 && (
            <div className="flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="relative flex-1 flex flex-col">
                <button onClick={() => setIsExportMenuOpen(!isExportMenuOpen)} className="w-full flex items-center justify-center gap-2 py-2 border border-blue-500/30 text-blue-400 bg-blue-500/5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span className="text-[9px] font-mono uppercase tracking-widest">Export</span>
                </button>
                
                {isExportMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsExportMenuOpen(false)} />
                    <div className="absolute left-0 bottom-full mb-2 w-full bg-[#0A0A0A] border border-outline-variant shadow-2xl z-50 overflow-hidden">
                      <div className="px-3 py-2 border-b border-outline-variant/30 text-[8px] font-mono text-on-surface-variant uppercase tracking-widest opacity-60">Choose Format</div>
                      <button 
                        onClick={() => { onExport('csv'); setIsExportMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 text-[9px] font-mono uppercase tracking-widest text-on-surface hover:bg-blue-500/10 transition-colors border-b border-outline-variant/10"
                      >
                        CSV Spreadsheet
                      </button>
                      <button 
                        onClick={() => { onExport('xlsx'); setIsExportMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 text-[9px] font-mono uppercase tracking-widest text-on-surface hover:bg-blue-500/10 transition-colors"
                      >
                        Excel (XLSX)
                      </button>
                    </div>
                  </>
                )}
              </div>
              <button onClick={onDeleteClick} className="flex-1 flex items-center justify-center gap-2 py-2 border border-red-500/30 text-red-400 bg-red-500/5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                <span className="text-[9px] font-mono uppercase tracking-widest">Delete</span>
              </button>
            </div>
          )}

          {/* Select All moved to the end of the panel */}
          <div className="pt-2 border-t border-outline-variant/30 mt-2">
            <div onClick={onToggleSelectAll} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 border-2 transition-all flex items-center justify-center rounded-[2px] ${isAllSelected ? 'border-primary bg-primary' : 'border-outline-variant bg-transparent'}`}>
                {isAllSelected && (
                  <svg className="w-3.5 h-3.5 text-on-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {selectedCount > 0 && !isAllSelected && <div className="w-2.5 h-[2px] bg-primary" />}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
                {selectedCount > 0 ? `${selectedCount} Selected` : 'Select All Applications'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
