'use client'

import { useState } from 'react'
import Toast from '../jobs/components/Toast'

interface Candidate {
  full_name: string | null
  email: string | null
  contact_number: string | null
  linkedin: string | null
  github: string | null
}

interface CandidatesProps {
  candidates: Candidate[]
}

const SocialLinkActions = ({ url, label, onCopy }: { url: string | null, label: string, onCopy: (msg: string) => void }) => {
  if (!url || url === 'NULL') return <span className="text-on-surface-variant/40 font-mono text-[10px] italic">NULL</span>;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    onCopy(`${label} link copied to clipboard`);
  };

  return (
    <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
      <a 
        href={url} 
        target="_blank" 
        rel="noreferrer"
        title={`Open ${label}`}
        className="p-1.5 rounded-sm bg-primary/5 border border-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-[0_0_15px_rgba(163,201,255,0.05)] hover:shadow-[0_0_20px_rgba(163,201,255,0.2)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>
      <button 
        onClick={copyToClipboard}
        title={`Copy ${label} Link`}
        className="p-1.5 rounded-sm bg-secondary/5 border border-secondary/10 text-secondary hover:bg-secondary hover:text-on-primary transition-all duration-300 shadow-[0_0_15px_rgba(73,255,233,0.05)] hover:shadow-[0_0_20px_rgba(73,255,233,0.2)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </button>
    </div>
  );
};

export default function Candidates({ candidates }: CandidatesProps) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (message: string) => {
    setToast({ message, type: 'success' });
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const query = searchQuery.toLowerCase();
    return (
      (candidate.full_name?.toLowerCase().includes(query)) ||
      (candidate.email?.toLowerCase().includes(query)) ||
      (candidate.contact_number?.toLowerCase().includes(query))
    );
  });

  return (
    <section className="p-4 md:p-8 grid-bg pt-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter text-on-surface whitespace-nowrap">Candidates</h2>
            <div className="h-[2px] flex-1 bg-outline-variant opacity-30" />
          </div>
          
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-lowest border border-outline-variant focus:border-primary/50 focus:ring-1 focus:ring-primary/20 p-2.5 pl-10 text-xs font-mono uppercase tracking-widest text-on-surface outline-none transition-all rounded-sm placeholder:text-on-surface-variant/40"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-on-surface-variant hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Large Device: Table View */}
        <div className="hidden md:block overflow-hidden glass glass-border rounded-lg transition-all duration-500">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-lowest">
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Full Name</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Email</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Contact</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">LinkedIn</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">GitHub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate, idx) => (
                  <tr key={idx} className="hover:bg-surface-low/50 transition-colors group">
                    <td className="p-4 text-sm font-medium text-on-surface">{candidate.full_name || 'NULL'}</td>
                    <td className="p-4 text-sm text-on-surface-variant font-mono">{candidate.email || 'NULL'}</td>
                    <td className="p-4 text-sm text-on-surface-variant font-mono">{candidate.contact_number || 'NULL'}</td>
                    <td className="p-4">
                      <SocialLinkActions url={candidate.linkedin} label="LinkedIn" onCopy={showToast} />
                    </td>
                    <td className="p-4">
                      <SocialLinkActions url={candidate.github} label="GitHub" onCopy={showToast} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-on-surface-variant font-mono text-xs uppercase tracking-[0.3em] opacity-40">
                    No candidates found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Device: Card View */}
        <div className="md:hidden space-y-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate, idx) => (
              <div key={idx} className="glass glass-border p-5 space-y-4 relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-display uppercase tracking-widest text-primary">{candidate.full_name}</h3>
                    <p className="text-xs text-on-surface-variant font-mono">{candidate.email}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px] font-mono">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {candidate.contact_number && (
                    <div className="flex flex-col col-span-2">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/60">Contact</span>
                      <span className="text-sm text-on-surface font-mono">{candidate.contact_number}</span>
                    </div>
                  )}
                  {candidate.linkedin && (
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2">LinkedIn</span>
                      <SocialLinkActions url={candidate.linkedin} label="LinkedIn" onCopy={showToast} />
                    </div>
                  )}
                  {candidate.github && (
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2">GitHub</span>
                      <SocialLinkActions url={candidate.github} label="GitHub" onCopy={showToast} />
                    </div>
                  )}
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -rotate-45 translate-x-8 -translate-y-8" />
              </div>
            ))
          ) : (
            <div className="p-10 glass border border-dashed border-outline-variant text-center text-on-surface-variant font-mono text-[10px] uppercase tracking-widest opacity-50">
              No results found
            </div>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  )
}
