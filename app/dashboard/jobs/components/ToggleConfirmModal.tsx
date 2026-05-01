'use client'

interface ToggleConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  jobTitle: string
  targetStatus: boolean
  isPending: boolean
}

export default function ToggleConfirmModal({ isOpen, onClose, onConfirm, jobTitle, targetStatus, isPending }: ToggleConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass glass-border p-8 max-w-md w-full relative z-10 glow-primary">
        <h3 className="text-2xl font-display uppercase tracking-widest text-on-surface mb-4">
          Confirm Action
        </h3>
        <p className="text-on-surface-variant font-mono text-sm leading-relaxed mb-8">
          Are you sure you want to <span className={targetStatus ? 'text-green-400' : 'text-red-400'}>{targetStatus ? 'ENABLE' : 'DISABLE'}</span> the job post for <span className="text-primary">"{jobTitle}"</span>?
        </p>
        
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
            className={`flex-1 py-3 font-mono text-xs uppercase tracking-widest text-on-primary transition-all active:scale-[0.98] disabled:opacity-50 ${targetStatus ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {isPending ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}
