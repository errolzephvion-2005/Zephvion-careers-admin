'use client'

import { useState, useTransition } from 'react'
import Navbar from '@/shared/components/Navbar'
import Link from 'next/link'
import { createJob, toggleJobActive, updateJob } from './actions'
import ToggleConfirmModal from './components/ToggleConfirmModal'
import EditJobModal from './components/EditJobModal'
import CreateJobModal from './components/CreateJobModal'
import SummaryModal from './components/SummaryModal'
import Toast from './components/Toast'

interface JobsClientProps {
  jobs: any[]
}

export default function JobsClient({ jobs }: JobsClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Modal States
  const [isAddingJob, setIsAddingJob] = useState(false)
  const [editingJob, setEditingJob] = useState<any>(null)
  const [togglingJob, setTogglingJob] = useState<any>(null)
  const [pendingChanges, setPendingChanges] = useState<{ job: any, changes: any[] } | null>(null)
  const [finalSummary, setFinalSummary] = useState<any[] | null>(null)
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

  const handleCreateJob = (data: any) => {
    startTransition(async () => {
      const result = await createJob(data)
      if (result.success) {
        setIsAddingJob(false)
        setToast({ message: 'JOB POSITION PUBLISHED SUCCESSFULLY', type: 'success' })
      } else {
        setToast({ message: 'PUBLISH FAILED: ' + result.error, type: 'error' })
      }
    })
  }

  const handleToggleConfirm = () => {
    if (!togglingJob) return
    
    startTransition(async () => {
      const result = await toggleJobActive(togglingJob.id, !togglingJob.is_active)
      if (result.success) {
        setTogglingJob(null)
        setToast({ message: `JOB ${!togglingJob.is_active ? 'ENABLED' : 'DISABLED'} SUCCESSFULLY`, type: 'success' })
      } else {
        setToast({ message: 'FAILED TO UPDATE STATUS: ' + result.error, type: 'error' })
      }
    })
  }

  const handleInitiateReview = (updatedData: any) => {
    if (!editingJob) return

    // Calculate changes
    const changes: any[] = []
    Object.keys(updatedData).forEach(key => {
      // Basic comparison, ensuring we don't count null vs empty string as change if not needed
      const oldVal = editingJob[key]
      const newVal = updatedData[key]
      
      if (oldVal !== newVal) {
        changes.push({
          field: key,
          from: oldVal ?? 'N/A',
          to: newVal ?? 'N/A'
        })
      }
    })

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
        setToast({ message: 'JOB UPDATED SUCCESSFULLY', type: 'success' })
      } else {
        setToast({ message: 'UPDATE FAILED: ' + result.error, type: 'error' })
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

      <section className="p-4 md:p-8 grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-on-surface whitespace-nowrap">Available Jobs</h2>
              <div className="h-[2px] flex-1 bg-outline-variant opacity-30" />
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
              <div className="text-on-surface-variant font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-60">
                {filteredJobs.length} POSITIONS
              </div>
              <button
                onClick={() => setIsAddingJob(true)}
                className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-primary/10 border border-primary/20 hover:bg-primary hover:border-primary transition-all duration-500 shadow-lg hover:shadow-primary/20 whitespace-nowrap"
              >
                <div className="w-4 h-4 md:w-5 md:h-5 bg-primary rounded-sm flex items-center justify-center text-on-primary group-hover:bg-on-primary group-hover:text-primary transition-colors">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span 
                  className="font-display tracking-widest text-primary group-hover:text-on-primary transition-colors uppercase"
                  style={{ fontSize: 'clamp(0.875rem, 3.5vw, 1.125rem)' }}
                >
                  Add Position
                </span>
              </button>
            </div>
          </div>

          <div className="glass glass-border p-4 md:p-6 mb-8 glow-primary flex flex-col gap-4 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-4 relative z-10">
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-on-surface-variant group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="SEARCH KEYWORD, FIELD, REF CODE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-surface-lowest border border-outline-variant/30 text-on-surface placeholder-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary font-mono text-sm uppercase tracking-wider transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <div className="relative min-w-[160px]">
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value as any)}
                    className="block w-full appearance-none bg-surface-lowest border border-outline-variant/30 text-on-surface py-3 pl-4 pr-10 focus:border-primary focus:ring-1 focus:ring-primary font-mono text-sm uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <option value="all">ALL STATUSES</option>
                    <option value="enabled">ACTIVE ONLY</option>
                    <option value="disabled">INACTIVE ONLY</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>

                <div className="relative min-w-[160px]">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="block w-full appearance-none bg-surface-lowest border border-outline-variant/30 text-on-surface py-3 pl-4 pr-10 focus:border-primary focus:ring-1 focus:ring-primary font-mono text-sm uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <option value="all">ALL TYPES</option>
                    <option value="technical">TECHNICAL</option>
                    <option value="non-technical">NON-TECHNICAL</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                <div
                  key={job.id}
                  className={`glass glass-border p-6 flex flex-col glow-primary relative group transition-all duration-300 ${!job.is_active ? 'opacity-60 grayscale-[0.5]' : 'hover:bg-surface-lowest/50'}`}
                >
                  {/* Status Badge & Actions */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] flex flex-col">
                      <span>{job.category || 'General'}</span>
                      <span className="text-on-surface-variant/60 mt-1">{job.job_type === 'technical' ? 'TECH' : 'NON-TECH'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Toggle Switch */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setTogglingJob(job)
                        }}
                        className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${job.is_active ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}
                        title={job.is_active ? 'Disable Job' : 'Enable Job'}
                      >
                        <div className={`absolute top-[3px] w-3 h-3 rounded-full transition-all duration-300 ${job.is_active ? 'left-6 bg-green-500' : 'left-1 bg-red-500'}`} />
                      </button>
                      
                      {/* Edit Icon */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setEditingJob(job)
                        }}
                        className="p-1.5 glass-border bg-surface-lowest/50 text-on-surface-variant hover:text-primary hover:border-primary transition-all"
                        title="Edit Job"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <Link href={`/dashboard/jobs/${job.id}`} className="flex-1 block group">
                    <h3 className="text-xl font-display uppercase tracking-widest text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {job.job_title}
                    </h3>

                    <div className="text-xs text-on-surface-variant font-mono mb-6">
                      {job.location} • {job.work_experience}
                    </div>

                    <div className="mt-auto pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
                        {job.job_reference_code}
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${job.status === 'OPEN' || job.status === 'NEW' ? 'text-green-500' : job.status === 'CRITICAL-REQUIREMENT' ? 'text-orange-500 animate-pulse' : 'text-red-500'}`}>
                        {job.status}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <CreateJobModal
        isOpen={isAddingJob}
        onClose={() => setIsAddingJob(false)}
        onSave={handleCreateJob}
        isPending={isPending}
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

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  )
}
