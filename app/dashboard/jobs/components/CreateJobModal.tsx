'use client'

import { useState, useEffect } from 'react'

import { Job } from '@/shared/types'

interface CreateJobModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: Partial<Job>) => void
  isPending: boolean
}

export default function CreateJobModal({ isOpen, onClose, onSave, isPending }: CreateJobModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const [formData, setFormData] = useState<Partial<Job>>({
    job_title: '',
    job_reference_code: '',
    work_experience: '',
    location: '',
    educational_requirements: '',
    salary: '',
    job_type: 'technical',
    status: 'NEW',
    category: '',
    service_line: '',
    responsibilities: '',
    technical_requirements: '',
    preferred_skills: '',
    is_trending: false,
    is_active: true
  })

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, tagName } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (tagName.toLowerCase() === 'textarea') {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollHeight + 'px'
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const inputClasses = "w-full bg-surface-lowest border-b border-outline-variant focus:border-primary focus:outline-none p-3 text-sm text-on-surface transition-all font-mono mb-4"
  const labelClasses = "block text-[10px] font-mono uppercase tracking-widest text-primary mb-1"
  const sectionTitleClasses = "text-[10px] font-mono uppercase tracking-[0.3em] text-on-surface-variant/40 mb-6 flex items-center gap-4 before:h-[1px] before:flex-1 before:bg-outline-variant/20 after:h-[1px] after:flex-1 after:bg-outline-variant/20"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="glass glass-border p-6 md:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar relative z-10 glow-primary shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-outline-variant/30">
          <div>
            <h3 className="text-3xl font-display uppercase tracking-tighter text-on-surface">
              Create New Position
            </h3>
            <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest mt-1">
              Field highlighted in <span className="text-primary">Blue</span> are required
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-low rounded-full transition-colors text-on-surface-variant hover:text-primary">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Essential Info */}
          <div>
            <h4 className={sectionTitleClasses}>Essential Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                <label className={labelClasses}>Job Title <span className="text-primary">*</span></label>
                <input 
                  name="job_title" 
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.job_title} 
                  onChange={handleChange} 
                  className={inputClasses} 
                  required 
                />
              </div>
              <div>
                <label className={labelClasses}>Reference Code <span className="text-primary">*</span></label>
                <input 
                  name="job_reference_code" 
                  placeholder="e.g. ZV-ENG-2024-001"
                  value={formData.job_reference_code} 
                  onChange={handleChange} 
                  className={inputClasses} 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Experience <span className="text-primary">*</span></label>
                  <input 
                    name="work_experience" 
                    placeholder="e.g. 5-8 Years"
                    value={formData.work_experience} 
                    onChange={handleChange} 
                    className={inputClasses} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClasses}>Location <span className="text-primary">*</span></label>
                  <input 
                    name="location" 
                    placeholder="e.g. Bangalore, India"
                    value={formData.location} 
                    onChange={handleChange} 
                    className={inputClasses} 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Salary Range <span className="text-primary">*</span></label>
                  <input 
                    name="salary" 
                    placeholder="e.g. 15 LPA - 25 LPA"
                    value={formData.salary} 
                    onChange={handleChange} 
                    className={inputClasses} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClasses}>Job Type <span className="text-primary">*</span></label>
                  <select name="job_type" value={formData.job_type} onChange={handleChange} className={inputClasses} required>
                    <option value="technical">TECHNICAL</option>
                    <option value="non-technical">NON-TECHNICAL</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div>
            <h4 className={sectionTitleClasses}>Classification & Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                <label className={labelClasses}>Status <span className="text-primary">*</span></label>
                <select name="status" value={formData.status} onChange={handleChange} className={inputClasses} required>
                  <option value="NEW">NEW</option>
                  <option value="CRITICAL-REQUIREMENT">CRITICAL REQUIREMENT</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Category</label>
                <input 
                  name="category" 
                  placeholder="e.g. Software Engineering"
                  value={formData.category} 
                  onChange={handleChange} 
                  className={inputClasses} 
                />
              </div>
              <div>
                <label className={labelClasses}>Service Line</label>
                <input 
                  name="service_line" 
                  placeholder="e.g. Data & Analytics Unit"
                  value={formData.service_line} 
                  onChange={handleChange} 
                  className={inputClasses} 
                />
              </div>
              <div className="flex items-center gap-8 mt-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.is_trending ? 'bg-primary' : 'bg-surface-low border border-outline-variant'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${formData.is_trending ? 'left-6 bg-on-primary' : 'left-1 bg-on-surface-variant'}`} />
                  </div>
                  <input type="checkbox" name="is_trending" checked={formData.is_trending} onChange={handleChange} className="hidden" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">Trending</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.is_active ? 'bg-green-500' : 'bg-surface-low border border-outline-variant'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${formData.is_active ? 'left-6 bg-on-primary' : 'left-1 bg-on-surface-variant'}`} />
                  </div>
                  <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="hidden" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">Publicly Active</span>
                </label>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h4 className={sectionTitleClasses}>Detailed Content</h4>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className={labelClasses}>Responsibilities <span className="text-primary">*</span></label>
                <textarea 
                  name="responsibilities" 
                  placeholder="Enter main job responsibilities..."
                  value={formData.responsibilities} 
                  onChange={handleChange} 
                  className={`${inputClasses} min-h-[100px] overflow-hidden resize-none`} 
                  required 
                />
              </div>
              <div>
                <label className={labelClasses}>Technical Requirements <span className="text-primary">*</span></label>
                <textarea 
                  name="technical_requirements" 
                  placeholder="Enter required technical skills..."
                  value={formData.technical_requirements} 
                  onChange={handleChange} 
                  className={`${inputClasses} min-h-[100px] overflow-hidden resize-none`} 
                  required 
                />
              </div>
              <div>
                <label className={labelClasses}>Educational Requirements</label>
                <textarea 
                  name="educational_requirements" 
                  placeholder="e.g. Bachelor's in Computer Science..."
                  value={formData.educational_requirements} 
                  onChange={handleChange} 
                  className={`${inputClasses} min-h-[80px] overflow-hidden resize-none`} 
                />
              </div>
              <div>
                <label className={labelClasses}>Preferred Skills</label>
                <textarea 
                  name="preferred_skills" 
                  placeholder="Enter additional desired skills..."
                  value={formData.preferred_skills} 
                  onChange={handleChange} 
                  className={`${inputClasses} min-h-[80px] overflow-hidden resize-none`} 
                />
              </div>
            </div>
          </div>

          <div className="pt-6 pb-2 border-t border-outline-variant/30 flex flex-col sm:flex-row gap-4 mt-12">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-outline-variant text-on-surface-variant font-mono text-xs uppercase tracking-widest hover:bg-surface-low transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-[2] py-4 gradient-primary text-on-primary font-display text-xl uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg"
            >
              {isPending ? 'Publishing...' : 'Publish Position'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
