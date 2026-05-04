'use client'

import React from 'react'
import { Application } from '@/shared/types'

interface ApplicationTableProps {
  applications: Application[]
  selectedIds: number[]
  onToggleSelect: (id: number) => void
  onViewDetails: (app: Application) => void
  searchQuery: string
}

export default function ApplicationTable({
  applications,
  selectedIds,
  onToggleSelect,
  onViewDetails,
  searchQuery
}: ApplicationTableProps) {
  return (
    <div className="hidden md:block overflow-hidden glass glass-border rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant bg-surface-lowest">
            <th className="p-4 w-12"></th>
            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Candidate</th>
            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Job Title</th>
            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Applied Date</th>
            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Status</th>
            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/30">
          {applications.length > 0 ? applications.map((app) => (
            <tr key={app.id} id={`app-${app.id}`} className={`hover:bg-surface-low/50 transition-colors group ${selectedIds.includes(app.id) ? 'bg-primary/5' : ''}`}>
              <td className="p-4">
                <div onClick={() => onToggleSelect(app.id)} className="cursor-pointer flex items-center justify-center">
                  <div className={`w-4 h-4 border transition-all duration-200 flex items-center justify-center rounded-[1px] ${selectedIds.includes(app.id) ? 'border-primary bg-primary' : 'border-outline-variant group-hover:border-primary/40'}`}>
                    {selectedIds.includes(app.id) && (
                      <svg className="w-3 h-3 text-on-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </div>
                </div>
              </td>
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
                <button onClick={() => onViewDetails(app)} className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline decoration-primary/30 underline-offset-4">View Details</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} className="p-8 text-center text-on-surface-variant font-mono text-sm">
                No applications found matching "{searchQuery}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
