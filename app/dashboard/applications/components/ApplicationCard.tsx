'use client'

import React from 'react'
import { Application } from '@/shared/types'

interface ApplicationCardProps {
  app: Application
  isSelected: boolean
  onToggleSelect: (id: number) => void
  onViewDetails: (app: Application) => void
}

export default function ApplicationCard({
  app,
  isSelected,
  onToggleSelect,
  onViewDetails
}: ApplicationCardProps) {
  return (
    <div id={`app-${app.id}`} className={`glass glass-border p-5 flex flex-col gap-4 relative hover:bg-surface-lowest/50 transition-colors ${isSelected ? 'bg-primary/5 border-primary/30' : ''}`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-lg font-display text-on-surface uppercase tracking-wider truncate">{app.candidates?.full_name}</div>
          <div className="text-[10px] font-mono text-on-surface-variant truncate">{app.candidates?.email}</div>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div 
            onClick={() => onToggleSelect(app.id)}
            className={`w-8 h-8 transition-all duration-300 flex items-center justify-center rounded-sm border ${
              isSelected 
                ? 'bg-primary border-primary/50 text-on-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]' 
                : 'bg-surface-low border-outline-variant/30 text-on-surface-variant/30 hover:border-primary/50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest border whitespace-nowrap ${
            app.status === 'applied' ? 'border-primary/30 text-primary bg-primary/5' : 
            app.status === 'reviewed' ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' :
            'border-on-surface-variant/30 text-on-surface-variant'
          }`}>
            {app.status}
          </span>
        </div>
      </div>
      
      <div className="border-t border-outline-variant/30 pt-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60 mb-1">Applying For</div>
        <div className="text-sm text-on-surface font-medium uppercase tracking-wider">{app.jobs?.job_title}</div>
        <div className="text-[10px] font-mono text-on-surface-variant">{app.jobs?.job_reference_code}</div>
      </div>

      <div className="flex justify-between items-end border-t border-outline-variant/30 pt-4 mt-2">
        <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">
          <span className="opacity-50 block mb-1">Date Applied</span>
          {new Date(app.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
        <button 
          onClick={() => onViewDetails(app)}
          className="px-4 py-2 bg-primary/10 border border-primary/20 text-[10px] font-mono uppercase tracking-widest text-primary hover:bg-primary hover:text-on-primary transition-all"
        >
          View
        </button>
      </div>
    </div>
  )
}
