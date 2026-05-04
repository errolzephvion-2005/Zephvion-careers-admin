'use client'

import React from 'react'

interface ActionConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: React.ReactNode
  confirmText: string
  confirmStyle?: 'danger' | 'success' | 'primary'
  isPending?: boolean
}

export default function ActionConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText, 
  confirmStyle = 'primary',
  isPending = false
}: ActionConfirmModalProps) {
  if (!isOpen) return null

  const styleClasses = {
    danger: 'bg-red-600/20 border-red-500/50 text-red-500 hover:bg-red-600 hover:text-white',
    success: 'bg-green-600/20 border-green-500/50 text-green-500 hover:bg-green-600 hover:text-white',
    primary: 'bg-primary/20 border-primary/50 text-primary hover:bg-primary hover:text-on-primary'
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass glass-border p-8 max-w-md w-full relative z-10">
        <h3 className="text-2xl font-display uppercase tracking-widest text-on-surface mb-4">
          {title}
        </h3>
        <div className="text-on-surface-variant font-mono text-sm leading-relaxed mb-8">
          {message}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 py-3 border border-outline-variant text-on-surface-variant font-mono text-xs uppercase tracking-widest hover:bg-surface-low transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className={`flex-1 py-3 border font-mono text-xs uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 ${styleClasses[confirmStyle]}`}
          >
            {isPending ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
