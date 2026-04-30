'use client'

import { useState } from 'react'
import Navbar from '@/shared/components/Navbar'

interface ApplicationsClientProps {
  applications: any[]
}

export default function ApplicationsClient({ applications }: ApplicationsClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Dashboard', active: false, href: '/dashboard' },
    { label: 'Jobs', active: false, href: '/dashboard/jobs' },
    { label: 'Applications', active: true, href: '/dashboard/applications' },
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
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-on-surface">Applications</h2>
            <div className="h-[2px] flex-1 bg-outline-variant opacity-30" />
            <div className="text-primary font-mono text-sm tracking-widest uppercase">
              {applications.length} Received
            </div>
          </div>

          <div className="overflow-hidden glass glass-border rounded-lg">
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
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-surface-low/50 transition-colors group">
                    <td className="p-4">
                      <div className="text-sm font-medium text-on-surface">{app.candidates?.full_name}</div>
                      <div className="text-[10px] font-mono text-on-surface-variant">{app.candidates?.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-on-surface font-medium">{app.jobs?.job_title}</div>
                      <div className="text-[10px] font-mono text-on-surface-variant">{app.jobs?.job_reference_code}</div>
                    </td>
                    <td className="p-4 text-xs font-mono text-on-surface-variant">
                      {new Date(app.created_at).toLocaleDateString()}
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
                      <button className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline decoration-primary/30 underline-offset-4">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}
