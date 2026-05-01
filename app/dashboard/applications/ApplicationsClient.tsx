'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/shared/components/Navbar'

interface ApplicationsClientProps {
  applications: any[]
}

export default function ApplicationsClient({ applications }: ApplicationsClientProps) {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const router = useRouter()

  // Handle auto-scrolling to an anchored application if returning from details
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100) // slight delay to allow rendering
      }
    }
  }, [])

  const navLinks = [
    { label: 'Dashboard', active: false, href: '/dashboard' },
    { label: 'Jobs', active: false, href: '/dashboard/jobs' },
    { label: 'Applications', active: true, href: '/dashboard/applications' },
  ]

  // Group applications by candidate email + job reference code
  const { primaryApplications } = useMemo(() => {
    const grouped: Record<string, any[]> = {}
    applications.forEach(app => {
      const key = `${app.candidates?.email}-${app.jobs?.job_reference_code}`
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(app)
    })

    const primary = Object.values(grouped).map(group => group[0])
    return { primaryApplications: primary }
  }, [applications])

  // Filter based on search query
  const filteredApplications = useMemo(() => {
    if (!searchQuery.trim()) return primaryApplications

    const query = searchQuery.toLowerCase()

    return primaryApplications.filter(app => {
      // Helper to check object values excluding specific keys
      const checkObj = (obj: any, excludeKeys: string[] = []) => {
        if (!obj) return false
        return Object.entries(obj).some(([key, val]) => {
          if (excludeKeys.includes(key)) return false
          if (typeof val === 'string') {
            return val.toLowerCase().includes(query)
          }
          return false
        })
      }

      // Check application fields excluding URLs
      const appMatch = checkObj(app, ['resume_url', 'cover_letter'])
      const candidateMatch = checkObj(app.candidates)
      const jobMatch = checkObj(app.jobs)

      return appMatch || candidateMatch || jobMatch
    })
  }, [primaryApplications, searchQuery])

  const openDetails = (app: any) => {
    // Pass the current search state forward so it can be passed back later
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    params.set('fromId', app.id)
    
    router.push(`/dashboard/applications/${app.id}?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-surface flex flex-col font-sans relative">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navLinks={navLinks}
      />

      <section className="p-4 md:p-8 grid-bg flex-1">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center gap-2 min-[400px]:gap-4 mb-10">
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-on-surface break-words">Applications</h2>
            <div className="hidden min-[400px]:block h-[2px] flex-1 bg-outline-variant opacity-30" />
            <div className="text-primary font-mono text-sm tracking-widest uppercase whitespace-nowrap">
              {filteredApplications.length} Received
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative glass glass-border p-2">
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

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden glass glass-border rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-lowest">
                  <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Candidate</th>
                  <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Job Title</th>
                  <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Applied Date</th>
                  <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Status</th>
                  <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {filteredApplications.length > 0 ? filteredApplications.map((app) => (
                  <tr key={app.id} id={`app-${app.id}`} className="hover:bg-surface-low/50 transition-colors group">
                    <td className="p-4">
                      <div className="text-sm font-medium text-on-surface">{app.candidates?.full_name}</div>
                      <div className="text-[10px] font-mono text-on-surface-variant">{app.candidates?.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-on-surface font-medium">{app.jobs?.job_title}</div>
                      <div className="text-[10px] font-mono text-on-surface-variant">{app.jobs?.job_reference_code}</div>
                    </td>
                    <td className="p-4 text-xs font-mono text-on-surface-variant">
                      {new Date(app.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest border ${
                        app.status === 'applied' ? 'border-primary/30 text-primary bg-primary/5' : 
                        app.status === 'reviewed' ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' :
                        'border-on-surface-variant/30 text-on-surface-variant'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => openDetails(app)}
                        className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline decoration-primary/30 underline-offset-4"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-on-surface-variant font-mono text-sm">
                      No applications found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col gap-4">
            {filteredApplications.length > 0 ? filteredApplications.map((app) => (
              <div key={app.id} id={`app-${app.id}`} className="glass glass-border p-5 flex flex-col gap-4 relative hover:bg-surface-lowest/50 transition-colors">
                {/* Candidate Info & Status */}
                <div className="flex flex-col-reverse min-[280px]:flex-row min-[280px]:justify-between items-start gap-3 min-[280px]:gap-4">
                  <div>
                    <div className="text-lg font-display text-on-surface uppercase tracking-wider">{app.candidates?.full_name}</div>
                    <div className="text-[10px] font-mono text-on-surface-variant truncate max-w-[200px]">{app.candidates?.email}</div>
                  </div>
                  <span className={`self-end min-[280px]:self-start px-2 py-1 text-[9px] font-bold uppercase tracking-widest border whitespace-nowrap ${
                    app.status === 'applied' ? 'border-primary/30 text-primary bg-primary/5' : 
                    app.status === 'reviewed' ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' :
                    'border-on-surface-variant/30 text-on-surface-variant'
                  }`}>
                    {app.status}
                  </span>
                </div>
                
                {/* Job Info */}
                <div className="border-t border-outline-variant/30 pt-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60 mb-1">Applying For</div>
                  <div className="text-sm text-on-surface font-medium uppercase tracking-wider">{app.jobs?.job_title}</div>
                  <div className="text-[10px] font-mono text-on-surface-variant">{app.jobs?.job_reference_code}</div>
                </div>

                {/* Footer Info & Actions */}
                <div className="flex justify-between items-end border-t border-outline-variant/30 pt-4 mt-2">
                  <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">
                    <span className="opacity-50 block mb-1">Date Applied</span>
                    {new Date(app.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <button 
                    onClick={() => openDetails(app)}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 text-[10px] font-mono uppercase tracking-widest text-primary hover:bg-primary hover:text-on-primary transition-all"
                  >
                    View
                  </button>
                </div>
              </div>
            )) : (
              <div className="p-8 glass glass-border text-center text-on-surface-variant font-mono text-sm">
                No applications found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
