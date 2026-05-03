'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/shared/components/Navbar'
import { Application } from '@/shared/types'

interface ApplicationDetailsClientProps {
  appGroup: Application[]
}

export default function ApplicationDetailsClient({ appGroup }: ApplicationDetailsClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isJobExpanded, setIsJobExpanded] = useState(false)
  const [expandedResponseIds, setExpandedResponseIds] = useState<Record<string | number, boolean>>({})

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const fromId = searchParams.get('fromId') || ''

  const mainApp = appGroup[0]
  const otherResponses = appGroup.slice(1)
  const candidate = mainApp.candidates || {} as any // as any used briefly for mapping but structure is now typed
  const job = mainApp.jobs || {} as any

  const toggleResponse = (id: string | number) => {
    setExpandedResponseIds(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const navLinks = [
    { label: 'Dashboard', active: false, href: '/dashboard' },
    { label: 'Jobs', active: false, href: '/dashboard/jobs' },
    { label: 'Applications', active: true, href: '/dashboard/applications' },
  ]

  const DocumentActions = ({ url, label }: { url: string, label: string }) => {
    const [copied, setCopied] = useState(false)

    if (!url) return null

    const handleCopy = () => {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div className="flex items-center justify-between p-3 border border-outline-variant bg-surface-lowest overflow-hidden">
        <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface truncate pr-2">{label}</span>
        <div className="flex items-center gap-2 shrink-0">
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={`View ${label}`}
            className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors border border-primary/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </a>
          <button 
            onClick={handleCopy}
            title={`Copy ${label} URL`}
            className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${copied ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-outline-variant text-on-surface hover:border-primary hover:text-primary'}`}
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-surface flex flex-col font-sans relative">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navLinks={navLinks}
      />

      <section className="p-4 md:p-8 grid-bg flex-1 w-full max-w-[100vw] overflow-hidden">
        <div className="max-w-5xl mx-auto glass glass-border p-4 sm:p-6 md:p-10 shadow-2xl relative w-full overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 border-b border-outline-variant/30 pb-6 break-words">
            <div className="flex-1 min-w-0">
              <Link 
                href={`/dashboard/applications${search ? `?search=${encodeURIComponent(search)}` : ''}${fromId ? `#app-${fromId}` : ''}`} 
                className="text-primary hover:text-primary/80 font-mono text-xs uppercase tracking-widest mb-4 inline-flex items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Applications
              </Link>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-display uppercase tracking-tighter text-on-surface break-words">Application Details</h1>
              <div className="text-xs font-mono text-on-surface-variant mt-2 uppercase tracking-widest truncate">
                Submitted: {new Date(mainApp.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>
            
            <div className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border self-start md:self-auto shrink-0 ${
              mainApp.status === 'applied' ? 'border-primary/30 text-primary bg-primary/5' : 
              mainApp.status === 'reviewed' ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' :
              'border-on-surface-variant/30 text-on-surface-variant'
            }`}>
              {mainApp.status}
            </div>
          </div>

          <div className="space-y-8 md:space-y-12">
            
            {/* 1. Candidate Information Section */}
            <section>
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-primary/50 shrink-0"></span>
                <span className="truncate">Candidate Profile</span>
              </h3>
              
              <div className="bg-surface-low border border-outline-variant/50 flex flex-col w-full overflow-hidden">
                {/* Top: Name and Email */}
                <div className="p-4 sm:p-6 md:p-8 border-b border-outline-variant/30 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-surface-lowest">
                  <div className="flex flex-col gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70">Full Name</span>
                    <span className="text-xl sm:text-2xl font-display uppercase tracking-wider text-on-surface break-words">{candidate.full_name}</span>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end min-w-0">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70">Email Address</span>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                      <span className="text-sm font-mono text-on-surface break-all">{candidate.email}</span>
                      <a 
                        href={`mailto:${candidate.email}`}
                        title="Send Email"
                        className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-on-primary transition-colors shrink-0 self-start sm:self-auto"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Links (GitHub / LinkedIn) */}
                {( (job.job_type !== 'non-technical' && candidate.github) || candidate.linkedin) && (
                  <div className={`p-4 sm:p-6 md:p-8 border-b border-outline-variant/30 grid grid-cols-1 gap-4 md:gap-8 ${
                    (job.job_type !== 'non-technical' && candidate.github && candidate.linkedin) ? 'md:grid-cols-2' : 'md:grid-cols-1'
                  }`}>
                    {job.job_type !== 'non-technical' && candidate.github && (
                      <DocumentActions url={candidate.github} label="GitHub Profile" />
                    )}
                    {candidate.linkedin && (
                      <DocumentActions url={candidate.linkedin} label="LinkedIn Profile" />
                    )}
                  </div>
                )}

                {/* Other Details */}
                <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  {Object.entries(candidate).map(([key, value]) => {
                    if (['full_name', 'email', 'github', 'linkedin', 'id', 'created_at', 'updated_at'].includes(key)) return null
                    if (!value || typeof value !== 'string') return null
                    return (
                      <div key={key} className="flex flex-col gap-2 min-w-0">
                        <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70 truncate">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="text-sm font-medium text-on-surface break-words">{value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* 2. Job Information Section */}
            <section>
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-primary/50 shrink-0"></span>
                <span className="truncate">Job Details</span>
              </h3>
              
              <div className="bg-surface-low border border-outline-variant/50 flex flex-col w-full overflow-hidden">
                <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70">Job Title</span>
                    <span className="text-base font-medium text-on-surface uppercase tracking-wider break-words">{job.job_title}</span>
                  </div>
                  <div className="flex flex-col gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70">Reference Code</span>
                    <span className="text-sm font-mono text-on-surface break-words">{job.job_reference_code}</span>
                  </div>
                  <div className="flex flex-col gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70">Location</span>
                    <span className="text-sm font-medium text-on-surface break-words">{job.location || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70">Job Type</span>
                    <span className="text-sm font-medium text-on-surface break-words">{job.job_type || 'N/A'}</span>
                  </div>
                </div>

                {isJobExpanded && (
                  <div className="p-4 sm:p-6 md:p-8 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-surface-lowest">
                    {Object.entries(job).map(([key, value]) => {
                      if (['job_title', 'job_reference_code', 'location', 'job_type', 'id', 'created_at', 'updated_at', 'is_active', 'is_trending'].includes(key)) return null
                      if (!value || typeof value !== 'string') return null
                      
                      return (
                        <div key={key} className="flex flex-col gap-2 min-w-0">
                          <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70 truncate">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="text-sm font-medium text-on-surface whitespace-pre-wrap break-words">{value}</span>
                        </div>
                      )
                    })}
                  </div>
                )}

                <button 
                  onClick={() => setIsJobExpanded(!isJobExpanded)}
                  className="p-4 w-full border-t border-outline-variant/30 text-[10px] font-mono uppercase tracking-widest text-primary hover:bg-primary/5 transition-colors text-center"
                >
                  {isJobExpanded ? 'Collapse Job Details' : 'View Full Job Details'}
                </button>
              </div>
            </section>

            {/* 3. Motivation / Why do we hire you? */}
            {mainApp.motivation && (
              <section>
                <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-primary/50 shrink-0"></span>
                  <span className="truncate">Why Do We Hire You?</span>
                </h3>
                <div className="p-4 sm:p-6 md:p-8 border border-outline-variant bg-surface-low text-sm font-medium text-on-surface whitespace-pre-wrap leading-relaxed break-words">
                  {mainApp.motivation}
                </div>
              </section>
            )}

            {/* 4. Application Documents */}
            <section>
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-primary/50 shrink-0"></span>
                <span className="truncate">Application Documents</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DocumentActions url={mainApp.resume_url || ""} label="Resume" />
                <DocumentActions url={mainApp.cover_letter_url || mainApp.cover_letter || ""} label="Cover Letter" />
                
                {(!mainApp.resume_url && !mainApp.cover_letter_url && !mainApp.cover_letter) && (
                  <div className="col-span-full p-4 border border-outline-variant/30 text-center text-on-surface-variant font-mono text-xs uppercase tracking-widest">
                    No documents provided.
                  </div>
                )}
              </div>
            </section>

            {/* Other Responses / History */}
            {otherResponses.length > 0 && (
              <section className="pt-8 border-t border-outline-variant/30">
                <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-on-surface-variant mb-6 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-on-surface-variant/50 shrink-0"></span>
                  <span className="truncate">Historical Responses ({otherResponses.length})</span>
                </h3>
                
                <div className="flex flex-col gap-4">
                  {otherResponses.map((oldApp: Application) => {
                    const isExpanded = expandedResponseIds[oldApp.id]
                    return (
                      <div key={oldApp.id} className="border border-outline-variant bg-surface-low overflow-hidden">
                        <div 
                          onClick={() => toggleResponse(oldApp.id)}
                          className="flex justify-between items-center p-4 sm:p-6 cursor-pointer hover:bg-surface-lowest transition-colors gap-4"
                        >
                          <div className="flex flex-col gap-2 min-w-0">
                            <span className="text-sm font-medium text-on-surface truncate">Previous Application</span>
                            <span className="text-[10px] font-mono text-on-surface-variant truncate">
                              {new Date(oldApp.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                          </div>
                          <div className="text-primary text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 shrink-0">
                            <span className="hidden sm:inline">{isExpanded ? 'Hide Details' : 'Expand Details'}</span>
                            <span className="sm:hidden">{isExpanded ? 'Hide' : 'Expand'}</span>
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="border-t border-outline-variant/30 bg-surface-lowest p-4 sm:p-6 space-y-6">
                            {oldApp.motivation && (
                              <div className="space-y-2">
                                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70">
                                  Why Do We Hire You?
                                </span>
                                <div className="text-sm text-on-surface whitespace-pre-wrap break-words">
                                  {oldApp.motivation}
                                </div>
                              </div>
                            )}
                            
                            <div className="space-y-2">
                              <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-70">
                                Documents
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DocumentActions url={oldApp.resume_url || ""} label="Resume" />
                                <DocumentActions url={oldApp.cover_letter_url || oldApp.cover_letter || ""} label="Cover Letter" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

          </div>
        </div>
      </section>
    </main>
  )
}
