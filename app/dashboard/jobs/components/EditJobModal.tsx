'use client'

import { useState, useEffect } from 'react'

interface EditJobModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: any) => void
  job: any
  isPending: boolean
}

export default function EditJobModal({ isOpen, onClose, onSave, job, isPending }: EditJobModalProps) {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (job) {
      setFormData({ ...job })
    }
  }, [job])

  if (!isOpen) return null

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const inputClasses = "w-full bg-surface-lowest border-b border-outline-variant focus:border-primary focus:outline-none p-3 text-sm text-on-surface transition-all font-mono mb-4"
  const labelClasses = "block text-[10px] font-mono uppercase tracking-widest text-primary mb-1"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="glass glass-border p-6 md:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10 glow-primary shadow-2xl">
        <div className="flex justify-between items-center mb-10 sticky top-0 bg-surface-lowest/80 backdrop-blur-md z-10 py-2 border-b border-outline-variant/30">
          <h3 className="text-3xl font-display uppercase tracking-tighter text-on-surface">
            Edit Job Position
          </h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {/* Column 1 */}
          <div>
            <div>
              <label className={labelClasses}>Job Title</label>
              <input name="job_title" value={formData.job_title || ''} onChange={handleChange} className={inputClasses} required />
            </div>
            <div>
              <label className={labelClasses}>Reference Code</label>
              <input name="job_reference_code" value={formData.job_reference_code || ''} onChange={handleChange} className={inputClasses} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Experience</label>
                <input name="work_experience" value={formData.work_experience || ''} onChange={handleChange} className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Location</label>
                <input name="location" value={formData.location || ''} onChange={handleChange} className={inputClasses} />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Salary Range</label>
              <input name="salary" value={formData.salary || ''} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Category</label>
              <input name="category" value={formData.category || ''} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Status</label>
              <select name="status" value={formData.status || ''} onChange={handleChange} className={inputClasses}>
                <option value="NEW">NEW</option>
                <option value="CRITICAL-REQUIREMENT">CRITICAL REQUIREMENT</option>
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
            <div className="flex items-center gap-6 mb-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" name="is_trending" checked={formData.is_trending || false} onChange={handleChange} className="w-4 h-4 accent-primary" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant group-hover:text-primary">Trending</span>
              </label>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div>
              <label className={labelClasses}>Responsibilities</label>
              <textarea name="responsibilities" value={formData.responsibilities || ''} onChange={handleChange} className={`${inputClasses} h-24 resize-none`} />
            </div>
            <div>
              <label className={labelClasses}>Technical Requirements</label>
              <textarea name="technical_requirements" value={formData.technical_requirements || ''} onChange={handleChange} className={`${inputClasses} h-24 resize-none`} />
            </div>
            <div>
              <label className={labelClasses}>Preferred Skills</label>
              <textarea name="preferred_skills" value={formData.preferred_skills || ''} onChange={handleChange} className={`${inputClasses} h-24 resize-none`} />
            </div>
            <div>
              <label className={labelClasses}>Educational Requirements</label>
              <input name="educational_requirements" value={formData.educational_requirements || ''} onChange={handleChange} className={inputClasses} />
            </div>
          </div>

          <div className="md:col-span-2 mt-10 pt-6 border-t border-outline-variant/30 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-outline-variant text-on-surface-variant font-mono text-xs uppercase tracking-widest hover:bg-surface-low transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-[2] py-4 gradient-primary text-on-primary font-display text-xl uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isPending ? 'Saving Changes...' : 'Save Updates'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
