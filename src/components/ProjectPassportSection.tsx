import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Users, 
  ExternalLink,
  Lock,
  FileCode2,
  Building2,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProjectPassportSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence'>('overview');

  return (
    <section 
      id="passport" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-black/[0.06] select-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-3">
            Digital Academic Identity
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            Every Project Gets an Identity.
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-[#666666] font-sans">
            A verified record of the project, its people, work, and history.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE PROJECT PASSPORT UI MOCKUP */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-3xl bg-[#FAFAF8] border border-black/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {/* Top Document Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-white border-b border-black/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#111111] text-white flex items-center justify-center font-mono text-xs font-bold">
                PV
              </div>
              <div>
                <span className="text-[12px] font-mono font-medium text-[#111111] tracking-wider uppercase">
                  PROJECT PASSPORT
                </span>
                <span className="text-[11px] font-mono text-[#888888] ml-2">
                  #PV-2026-GEHU-042
                </span>
              </div>
            </div>

            {/* Verified Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] font-medium">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Faculty Verified</span>
            </div>
          </div>

          {/* Document Content */}
          <div className="p-6 sm:p-8">
            {/* Project Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-black/[0.06] gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#888888] font-mono mb-1">
                  Project Name
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#111111] font-medium tracking-tight">
                  CampusConnect
                </h3>
              </div>

              {/* Status & Repository */}
              <div className="flex items-center gap-3">
                {/* Active Status */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-[12px] font-medium text-[#111111] shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Status: Active</span>
                </div>

                {/* GitHub Connected */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-[12px] font-medium text-[#111111] shadow-2xs">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Connected</span>
                </div>
              </div>
            </div>

            {/* Core Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {/* Institution */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.06]">
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#888888] mb-1">
                  <Building2 size={13} />
                  <span>Institution</span>
                </div>
                <div className="text-[14px] font-semibold text-[#111111] font-sans">
                  Graphic Era Hill University
                </div>
              </div>

              {/* Domain */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.06]">
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#888888] mb-1">
                  <Layers size={13} />
                  <span>Domain</span>
                </div>
                <div className="text-[14px] font-semibold text-[#111111] font-sans">
                  Web Development
                </div>
              </div>

              {/* Contributors */}
              <div className="p-4 rounded-2xl bg-white border border-black/[0.06]">
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#888888] mb-1">
                  <Users size={13} />
                  <span>Contributors</span>
                </div>
                <div className="text-[14px] font-semibold text-[#111111] font-sans flex items-center gap-2">
                  <span>4 Students</span>
                  <span className="text-[11px] text-[#666666] font-normal font-mono">(Batch 2026)</span>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-5 p-4 rounded-2xl bg-white border border-black/[0.06]">
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#888888] mb-2">
                <FileCode2 size={13} />
                <span>Technologies</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full bg-[#F7F7F5] border border-black/[0.06] text-[12px] font-medium text-[#111111] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification Sign-Off Footer */}
            <div className="mt-5 p-4 rounded-2xl bg-[#F4F4F2] border border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] font-sans text-[#4A4A4A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Reviewed by Dr. A. Sharma (Head of CSE) • Cryptographic Hash Recorded</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#777777]">
                <Lock size={12} />
                <span>Immutable Proof</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectPassportSection;
