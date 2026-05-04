'use client'

import { useState, useTransition } from 'react'
import Navbar from '@/shared/components/Navbar'
import { Job } from '@/shared/types'
import { createJob, toggleJobActive, updateJob, deleteJob, toggleJobTrending } from './actions'
import ToggleConfirmModal from './components/ToggleConfirmModal'
import EditJobModal from './components/EditJobModal'
import CreateJobModal from './components/CreateJobModal'
import SummaryModal from './components/SummaryModal'
import ErrorModal from './components/ErrorModal'
import ActionConfirmModal from './components/ActionConfirmModal'
import Toast from './components/Toast'
import JobCard from './components/JobCard'
import JobsFilterBar from './components/JobsFilterBar'
import JobDetailPane from './components/JobDetailPane'

interface JobsClientProps {
  jobs: Job[]
}

export default function JobsClient({ jobs }: JobsClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Master-Detail State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isMobileListOpen, setIsMobileListOpen] = useState(false)

  // Modal States
  const [isAddingJob, setIsAddingJob] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [togglingJob, setTogglingJob] = useState<Job | null>(null)
  const [deletingJob, setDeletingJob] = useState<Job | null>(null)
  const [trendingJob, setTrendingJob] = useState<Job | null>(null)
  const [pendingChanges, setPendingChanges] = useState<{ job: Job, changes: any[] } | null>(null)
  const [finalSummary, setFinalSummary] = useState<any[] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null)

  // Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | 'enabled' | 'disabled'>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | 'technical' | 'non-technical'>('all')

  const navLinks = [
    { label: 'Dashboard', active: false, href: '/dashboard' },
    { label: 'Jobs', active: true, href: '/dashboard/jobs' },
    { label: 'Applications', active: false, href: '/dashboard/applications' },
  ]

  const handleCreateJob = (data: Partial<Job>) => {
    startTransition(async () => {
      const result = await createJob(data)
      if (result.success) {
        setIsAddingJob(false)
        setToast({ message: 'JOB POSITION PUBLISHED SUCCESSFULLY', type: 'success' })
      } else {
        setErrorMessage(result.error || 'AN UNEXPECTED ERROR OCCURRED WHILE PUBLISHING THE POSITION')
      }
    })
  }

  const handleToggleConfirm = () => {
    if (!togglingJob) return

    startTransition(async () => {
      const result = await toggleJobActive(togglingJob.id, !togglingJob.is_active)
      if (result.success) {
        setTogglingJob(null)
        if (selectedJob && selectedJob.id === togglingJob.id) {
          setSelectedJob({ ...selectedJob, is_active: !selectedJob.is_active })
        }
        setToast({ message: `JOB ${!togglingJob.is_active ? 'ENABLED' : 'DISABLED'} SUCCESSFULLY`, type: 'success' })
      } else {
        setErrorMessage(result.error || 'FAILED TO UPDATE JOB STATUS')
      }
    })
  }

  const handleDeleteConfirm = () => {
    if (!deletingJob) return

    startTransition(async () => {
      const result = await deleteJob(deletingJob.id)
      if (result.success) {
        if (selectedJob?.id === deletingJob.id) {
          setSelectedJob(null)
        }
        setDeletingJob(null)
        setToast({ message: 'JOB DELETED SUCCESSFULLY', type: 'success' })
      } else {
        setErrorMessage(result.error || 'FAILED TO DELETE JOB')
      }
    })
  }

  const handleTrendingConfirm = () => {
    if (!trendingJob) return

    startTransition(async () => {
      const newStatus = !trendingJob.is_trending
      const result = await toggleJobTrending(trendingJob.id, newStatus)
      if (result.success) {
        if (selectedJob?.id === trendingJob.id) {
          setSelectedJob({ ...selectedJob, is_trending: newStatus })
        }
        setTrendingJob(null)
        setToast({ message: `JOB ${newStatus ? 'MARKED AS TRENDING' : 'REMOVED FROM TRENDING'}`, type: 'success' })
      } else {
        setErrorMessage(result.error || 'FAILED TO UPDATE TRENDING STATUS')
      }
    })
  }

  const handleInitiateReview = (updatedData: Job) => {
    if (!editingJob) return

    // Calculate changes
    const changes: any[] = []
    for (const key of Object.keys(updatedData) as Array<keyof Job>) {
      const oldVal = editingJob[key]
      const newVal = updatedData[key]

      if (oldVal !== newVal) {
        changes.push({
          field: key,
          from: oldVal ?? 'N/A',
          to: newVal ?? 'N/A'
        })
      }
    }

    if (changes.length === 0) {
      setEditingJob(null)
      return
    }

    setPendingChanges({ job: updatedData, changes })
    setEditingJob(null) // Close the edit form
  }

  const handleConfirmSave = () => {
    if (!pendingChanges) return

    startTransition(async () => {
      const result = await updateJob(pendingChanges.job.id, pendingChanges.job)
      if (result.success) {
        const changes = pendingChanges.changes
        setPendingChanges(null)
        setFinalSummary(changes)
        if (selectedJob && selectedJob.id === pendingChanges.job.id) {
          setSelectedJob({ ...selectedJob, ...pendingChanges.job })
        }
        setToast({ message: 'JOB UPDATED SUCCESSFULLY', type: 'success' })
      } else {
        setErrorMessage(result.error || 'UPDATE FAILED')
      }
    })
  }

  const filteredJobs = jobs.filter(job => {
    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = Object.values(job).some(val =>
        String(val).toLowerCase().includes(query)
      )
      if (!matchesSearch) return false
    }

    // Active Filter
    if (activeFilter === 'enabled' && !job.is_active) return false
    if (activeFilter === 'disabled' && job.is_active) return false

    // Type Filter
    if (typeFilter !== 'all' && job.job_type !== typeFilter) return false

    return true
  })

  return (
    <main className="min-h-screen bg-surface flex flex-col font-sans relative">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navLinks={navLinks}
      />

      <section className="grid-bg flex-1 flex flex-col mx-auto w-full p-4 md:p-8 max-w-7xl">
        
        {/* Header Block - Dynamic Spacing */}
        <div className={`flex flex-col md:flex-row md:items-center ${selectedJob ? 'gap-4 md:gap-6 mb-6 shrink-0' : 'gap-6 mb-12'}`}>
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <h2 className={`font-display uppercase tracking-tighter text-on-surface whitespace-nowrap truncate ${selectedJob ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'}`}>
              Available Jobs
            </h2>
            <div className="hidden md:block h-[2px] flex-1 bg-outline-variant opacity-30" />
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto shrink-0">
            <div className="text-on-surface-variant font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-60">
              {filteredJobs.length} POSITIONS
            </div>
            <button
              onClick={() => setIsAddingJob(true)}
              className={`group flex items-center bg-primary/10 border border-primary/20 hover:bg-primary hover:border-primary transition-all duration-500 shadow-lg hover:shadow-primary/20 whitespace-nowrap ${selectedJob ? 'gap-2 px-4 py-2' : 'gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3'}`}
            >
              <div className={`bg-primary rounded-sm flex items-center justify-center text-on-primary group-hover:bg-on-primary group-hover:text-primary transition-colors ${selectedJob ? 'w-4 h-4' : 'w-4 h-4 md:w-5 md:h-5'}`}>
                <svg className={`fill-none ${selectedJob ? 'w-3 h-3' : 'w-3 h-3 md:w-4 md:h-4'}`} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span
                className="font-display tracking-widest text-primary group-hover:text-on-primary transition-colors uppercase"
                style={{ fontSize: selectedJob ? '0.875rem' : 'clamp(0.875rem, 3.5vw, 1.125rem)' }}
              >
                Add Position
              </span>
            </button>
          </div>
        </div>

        {!selectedJob ? (
          /* =========================================
             GRID VIEW (DEFAULT)
             ========================================= */
          <>
            <JobsFilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
            />

            {filteredJobs.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center glass glass-border">
                <svg className="w-16 h-16 text-on-surface-variant/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-display text-2xl uppercase tracking-widest text-on-surface mb-2">No Positions Found</h3>
                <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">Adjust your search or filters to see results</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSelect={setSelectedJob}
                    onToggle={(job) => {
                      setTogglingJob(job)
                    }}
                    onEdit={(job) => {
                      setEditingJob(job)
                    }}
                    onDelete={(job) => {
                      setDeletingJob(job)
                    }}
                    onToggleTrending={(job) => {
                      setTrendingJob(job)
                    }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* =========================================
             SPLIT VIEW (SELECTED JOB)
             ========================================= */
          <div className="flex gap-6 flex-1 pb-4 items-stretch relative">
            
            {/* Mobile Overlay */}
            {isMobileListOpen && (
              <div 
                className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileListOpen(false)}
              />
            )}

            {/* Left Sidebar (List) */}
            <div className={`
              fixed md:relative top-0 left-0 h-full md:h-auto z-50 md:z-0
              w-[85vw] max-[360px]:w-full md:w-[350px] lg:w-[400px] shrink-0
              bg-surface md:bg-transparent border-r md:border-r-0 border-outline-variant/30
              transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
              ${isMobileListOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
              <div className="absolute inset-0 flex flex-col gap-4 p-4 md:p-0 pt-4 md:pt-0">
                {/* Mobile Header with Close Button */}
                <div className="md:hidden flex items-center justify-between mb-2 pb-2 border-b border-outline-variant/30">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant pl-2">Available Jobs</span>
                  <button 
                    onClick={() => setIsMobileListOpen(false)}
                    className="p-2 bg-surface-lowest border border-outline-variant/50 text-on-surface-variant hover:text-primary transition-colors rounded-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>

                <JobsFilterBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  typeFilter={typeFilter}
                  setTypeFilter={setTypeFilter}
                  compact={true}
                />

                {/* List of Cards */}
                <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-6 pr-2 pb-4">
                  {filteredJobs.length === 0 ? (
                    <div className="py-12 text-center flex flex-col items-center border border-outline-variant/30 bg-surface-low">
                      <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">No positions found</p>
                    </div>
                  ) : (
                    filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        isSelected={selectedJob?.id === job.id}
                        onSelect={(selected) => {
                          setSelectedJob(selected)
                          setIsMobileListOpen(false)
                        }}
                        onToggle={(job) => {
                          setTogglingJob(job)
                        }}
                        onEdit={(job) => {
                          setEditingJob(job)
                        }}
                        onDelete={(job) => {
                          setDeletingJob(job)
                        }}
                        onToggleTrending={(job) => {
                          setTrendingJob(job)
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Pane (Details) */}
            <JobDetailPane
              selectedJob={selectedJob}
              onClose={() => setSelectedJob(null)}
              onOpenMobileList={() => setIsMobileListOpen(true)}
            />
            
          </div>
        )}
      </section>

      {/* Modals */}
      <CreateJobModal
        isOpen={isAddingJob}
        onClose={() => setIsAddingJob(false)}
        onSave={handleCreateJob}
        isPending={isPending}
      />

      <ErrorModal 
        isOpen={!!errorMessage}
        onClose={() => setErrorMessage(null)}
        title="Publish Failed"
        message={errorMessage || ''}
      />

      <ToggleConfirmModal
        isOpen={!!togglingJob}
        onClose={() => setTogglingJob(null)}
        onConfirm={handleToggleConfirm}
        jobTitle={togglingJob?.job_title || ''}
        targetStatus={!togglingJob?.is_active}
        isPending={isPending}
      />

      <EditJobModal
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        onSave={handleInitiateReview}
        job={editingJob}
        isPending={isPending}
      />

      {/* Review Changes Modal */}
      <SummaryModal
        isOpen={!!pendingChanges}
        onClose={() => setPendingChanges(null)}
        onConfirm={handleConfirmSave}
        changes={pendingChanges?.changes || []}
        mode="review"
        isPending={isPending}
      />

      {/* Final Success Summary Modal */}
      <SummaryModal
        isOpen={!!finalSummary}
        onClose={() => setFinalSummary(null)}
        changes={finalSummary || []}
        mode="success"
      />

      <ActionConfirmModal
        isOpen={!!deletingJob}
        onClose={() => setDeletingJob(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Job"
        message={<>Are you sure you want to permanently delete <span className="text-red-400">"{deletingJob?.job_title}"</span>? This action cannot be undone.</>}
        confirmText="Delete"
        confirmStyle="danger"
        isPending={isPending}
      />

      <ActionConfirmModal
        isOpen={!!trendingJob}
        onClose={() => setTrendingJob(null)}
        onConfirm={handleTrendingConfirm}
        title="Toggle Trending"
        message={<>Are you sure you want to {trendingJob?.is_trending ? <span className="text-red-400">remove</span> : <span className="text-green-400">add</span>} <span className="text-primary">"{trendingJob?.job_title}"</span> {trendingJob?.is_trending ? 'from' : 'to'} the trending list?</>}
        confirmText={trendingJob?.is_trending ? "Remove" : "Set Trending"}
        confirmStyle={trendingJob?.is_trending ? "danger" : "success"}
        isPending={isPending}
      />

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  )
}
