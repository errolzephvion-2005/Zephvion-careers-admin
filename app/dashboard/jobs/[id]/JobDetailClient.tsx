'use client'

import { useState } from 'react'
import Navbar from '@/shared/components/Navbar'
import Link from 'next/link'

interface JobDetailClientProps {
  job: any
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
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

      <section className="p-4 md:p-8 lg:p-12 grid-bg">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/dashboard/jobs"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest mb-8 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Jobs
          </Link>

          <div className="glass glass-border p-8 md:p-12 relative overflow-hidden">
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary font-mono text-[10px] tracking-[0.3em] uppercase bg-primary/10 px-3 py-1 rounded-full">
                    {job.category}
                  </span>
                  <span className="text-on-surface-variant font-mono text-[10px] tracking-widest uppercase">
                    ID: {job.job_reference_code}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-on-surface mb-2">
                  {job.job_title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-on-surface-variant font-mono uppercase tracking-widest">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.work_experience}</span>
                  <span>•</span>
                  <span>{job.job_type}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={`px-6 py-2 border-2 ${job.status === 'OPEN' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'} font-display text-xl tracking-[0.2em] uppercase`}>
                  {job.status}
                </div>
                <div className="text-primary font-display text-lg tracking-widest uppercase">
                  {job.salary}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-outline-variant/30 pt-12">
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-display uppercase tracking-[0.1em] text-primary mb-6">Responsibilities</h3>
                  <div className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-wrap font-sans opacity-90">
                    {job.responsibilities === 'N/A' ? 'No specific responsibilities listed.' : job.responsibilities}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-display uppercase tracking-[0.1em] text-primary mb-6">Educational Requirements</h3>
                  <div className="text-on-surface-variant text-sm leading-relaxed font-sans opacity-90">
                    {job.educational_requirements}
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-display uppercase tracking-[0.1em] text-primary mb-6">Technical Requirements</h3>
                  <div className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-wrap font-sans opacity-90">
                    {job.technical_requirements === 'N/A' ? 'Standard industry requirements apply.' : job.technical_requirements}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-display uppercase tracking-[0.1em] text-primary mb-6">Preferred Skills</h3>
                  <div className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-wrap font-sans opacity-90">
                    {job.preferred_skills}
                  </div>
                </div>
              </div>
            </div>

            {/* Background Branding Watermark */}
            <div className="absolute top-0 right-0 opacity-[0.03] font-display text-9xl -rotate-12 pointer-events-none translate-x-1/4 -translate-y-1/4">
              ZEPHVION
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
