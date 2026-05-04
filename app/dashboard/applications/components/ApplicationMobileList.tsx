'use client'

import React from 'react'
import { Application } from '@/shared/types'
import ApplicationCard from './ApplicationCard'

interface ApplicationMobileListProps {
  applications: Application[]
  selectedIds: number[]
  onToggleSelect: (id: number) => void
  onViewDetails: (app: Application) => void
  searchQuery: string
}

export default function ApplicationMobileList({
  applications,
  selectedIds,
  onToggleSelect,
  onViewDetails,
  searchQuery
}: ApplicationMobileListProps) {
  return (
    <div className="md:hidden flex flex-col gap-4">
      {applications.length > 0 ? applications.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          isSelected={selectedIds.includes(app.id)}
          onToggleSelect={onToggleSelect}
          onViewDetails={onViewDetails}
        />
      )) : (
        <div className="p-8 glass glass-border text-center text-on-surface-variant font-mono text-sm">
          No applications found matching "{searchQuery}"
        </div>
      )}
    </div>
  )
}
