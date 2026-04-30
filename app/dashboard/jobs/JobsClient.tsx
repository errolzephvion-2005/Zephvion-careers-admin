'use client'

import { useState } from 'react'
import Navbar from '@/shared/components/Navbar'
import Link from 'next/link'

interface JobsClientProps {
  jobs: any[]
}

export default function JobsClient({ jobs }: JobsClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Dashboard', active: false, href: '/dashboard' },
    { label: 'Jobs', active: true, href: '/dashboard/jobs' },
    { label: 'Applications', active: false, href: '/dashboard/applications' },
  ]

  return (
    <main className="min-h-screen bg-surface flex flex-col font-sans relative">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navLinks={navLinks}
      />

      <section className="p-4 md:p-8 grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-on-surface">Available Jobs</h2>
            <div className="h-[2px] flex-1 bg-outline-variant opacity-30" />
            <div className="text-primary font-mono text-sm tracking-widest uppercase">
              {jobs.length} Positions
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/dashboard/jobs/${job.id}`}
                className="glass glass-border p-6 group hover:bg-surface-lowest/50 transition-all duration-300 flex flex-col glow-primary"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
                    {job.category || 'General'}
                  </div>
                  {job.is_trending && (
                    <div className="bg-tertiary/10 text-tertiary text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-tertiary/20">
                      Trending
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-display uppercase tracking-widest text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {job.job_title}
                </h3>

                <div className="text-xs text-on-surface-variant font-mono mb-6 flex-1">
                  {job.location} • {job.work_experience}
                </div>

                <div className="mt-auto pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
                    {job.job_reference_code}
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${job.status === 'OPEN' ? 'text-green-500' : 'text-red-500'}`}>
                    {job.status}
                  </div>
                </div>

                {/* Industrial Hover Line */}
                <div className="mt-4 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
