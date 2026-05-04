'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/shared/components/Navbar'
import { Application } from '@/shared/types'
import { exportToExcel } from './utils/exportUtils'
import { deleteApplications } from './actions'
import ActionConfirmModal from './components/ActionConfirmModal'
import ApplicationsToolbar from './components/ApplicationsToolbar'
import ApplicationTable from './components/ApplicationTable'
import ApplicationMobileList from './components/ApplicationMobileList'

interface ApplicationsClientProps {
  applications: Application[]
}

export default function ApplicationsClient({ applications }: ApplicationsClientProps) {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'job'>('date')
  const [jobFilter, setJobFilter] = useState<string | null>(null)
  const [jobSearchQuery, setJobSearchQuery] = useState('')
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isOrderToggleVisible, setIsOrderToggleVisible] = useState(false)
  const [isJobFilterVisible, setIsJobFilterVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  // Handle auto-scrolling to an anchored application if returning from details
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
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
    const grouped: Record<string, Application[]> = {}
    applications.forEach(app => {
      const key = `${app.candidates?.email}-${app.jobs?.job_reference_code}`
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(app)
    })

    const primary = Object.values(grouped).map(group => group[0])
    return { primaryApplications: primary }
  }, [applications])

  // Filter based on search query and job filter
  const filteredApplications = useMemo(() => {
    let result = primaryApplications

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(app => {
        const checkObj = (obj: any, excludeKeys: string[] = []) => {
          if (!obj) return false
          return Object.entries(obj).some(([key, val]) => {
            if (excludeKeys.includes(key)) return false
            if (typeof val === 'string') return val.toLowerCase().includes(query)
            return false
          })
        }
        return checkObj(app, ['resume_url', 'cover_letter']) || checkObj(app.candidates) || checkObj(app.jobs)
      })
    }

    if (jobFilter) {
      result = result.filter(app => app.jobs?.job_title === jobFilter)
    }

    return result
  }, [primaryApplications, searchQuery, jobFilter])

  // Extract unique jobs for filtering
  const availableJobTitles = useMemo(() => {
    const jobs = applications
      .map(app => app.jobs?.job_title)
      .filter((title): title is string => !!title)
    return Array.from(new Set(jobs)).sort()
  }, [applications])

  // Sort applications
  const sortedApplications = useMemo(() => {
    const list = [...filteredApplications]
    list.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'date') {
        comparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else {
        const jobA = a.jobs?.job_title || ''
        const jobB = b.jobs?.job_title || ''
        comparison = jobA.localeCompare(jobB)
        // Secondary sort by date if jobs are same
        if (comparison === 0) {
          comparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }
      }
      return sortOrder === 'desc' ? comparison : -comparison
    })
    return list
  }, [filteredApplications, sortBy, sortOrder])

  const toggleSelect = (id: number) => {
    // Find the application to get its group context (candidate + job)
    const targetApp = applications.find(a => a.id === id);
    if (!targetApp) return;

    // Find all IDs in the same group (same candidate and same job)
    const relatedIds = applications
      .filter(a => a.candidate_id === targetApp.candidate_id && a.job_id === targetApp.job_id)
      .map(a => a.id);

    setSelectedIds(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        // Remove all related IDs
        return prev.filter(itemId => !relatedIds.includes(itemId));
      } else {
        // Add all related IDs (merge and deduplicate)
        return Array.from(new Set([...prev, ...relatedIds]));
      }
    });
  };

  const toggleSelectAll = () => {
    // Get all primary application IDs currently visible
    const visiblePrimaryIds = sortedApplications.map(app => app.id);
    
    // Find all IDs in the full applications list that belong to these visible groups
    const visibleGroupIds = applications
      .filter(app => 
        sortedApplications.some(sa => 
          sa.candidate_id === app.candidate_id && sa.job_id === app.job_id
        )
      )
      .map(app => app.id);

    const allVisibleSelected = visibleGroupIds.length > 0 && 
                               visibleGroupIds.every(id => selectedIds.includes(id));

    if (allVisibleSelected) {
      // Unselect only the visible groups
      setSelectedIds(prev => prev.filter(id => !visibleGroupIds.includes(id)));
    } else {
      // Select all IDs belonging to visible groups
      setSelectedIds(prev => Array.from(new Set([...prev, ...visibleGroupIds])));
    }
  };

  const handleResetSort = () => {
    setSortBy('date')
    setSortOrder('desc')
    setJobFilter(null)
    setJobSearchQuery('')
    setIsOrderToggleVisible(false)
    setIsJobFilterVisible(false)
  }

  const handleSortChange = (newSort: 'date' | 'job') => {
    setSortBy(newSort)
    if (newSort === 'date') {
      setIsOrderToggleVisible(true)
      setIsJobFilterVisible(false)
    } else {
      setIsOrderToggleVisible(false)
      setIsJobFilterVisible(true)
    }
  }

  const handleExport = async (format: 'csv' | 'xlsx') => {
    const dataToExport = selectedIds.length > 0 
      ? sortedApplications.filter(app => selectedIds.includes(app.id))
      : sortedApplications;
    
    await exportToExcel(dataToExport, format);
    setIsExportMenuOpen(false);
  }

  const handleDeleteConfirm = async () => {
    if (selectedIds.length === 0) return
    
    setIsDeleting(true)
    try {
      const result = await deleteApplications(selectedIds)
      
      if (result.success) {
        setSelectedIds([])
        setIsDeleteModalOpen(false)
        router.refresh()
      } else {
        alert(`Error deleting applications: ${result.error}`)
      }
    } catch (err) {
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const openDetails = (app: Application) => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    params.set('fromId', app.id.toString())
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
              {sortedApplications.length} Received
            </div>
          </div>

          <ApplicationsToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCount={selectedIds.length}
            totalVisible={sortedApplications.length}
            onToggleSelectAll={toggleSelectAll}
            sortBy={sortBy}
            setSortBy={setSortBy}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
            jobSearchQuery={jobSearchQuery}
            setJobSearchQuery={setJobSearchQuery}
            availableJobTitles={availableJobTitles}
            isSortMenuOpen={isSortMenuOpen}
            setIsSortMenuOpen={setIsSortMenuOpen}
            isExportMenuOpen={isExportMenuOpen}
            setIsExportMenuOpen={setIsExportMenuOpen}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            isOrderToggleVisible={isOrderToggleVisible}
            onResetSort={handleResetSort}
            onSortChange={handleSortChange}
            onDeleteClick={() => setIsDeleteModalOpen(true)}
            onExport={handleExport}
          />

          <ApplicationTable 
            applications={sortedApplications}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onViewDetails={openDetails}
            searchQuery={searchQuery}
          />

          <ApplicationMobileList 
            applications={sortedApplications}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onViewDetails={openDetails}
            searchQuery={searchQuery}
          />
        </div>
      </section>

      <ActionConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Applications"
        message={<>Are you sure you want to delete <span className="text-red-400 font-bold">{selectedIds.length}</span> selected application{selectedIds.length > 1 ? 's' : ''}? This action is irreversible.</>}
        confirmText="Confirm Delete"
        confirmStyle="danger"
      />
    </main>
  )
}
