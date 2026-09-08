import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Building2, 
  Layers, 
  Users, 
  FileCode2, 
  Lock, 
  ExternalLink 
} from 'lucide-react';

export const ProjectPassportSection: React.FC = () => {
  return (
    <section 
      id="passport" 
      className="relative w-full py-18 sm:py-24 px-4 sm:px-6 bg-white border-t border-black/[0.06] select-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#555555] mb-3">
            Digital Identity Document
          </div>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[40px] text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            Every Project Gets an Identity.
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] font-sans">
            A verified record of the project, its contributors, technical architecture, and academic sign-off.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* REAL PRODUCT UI MOCKUP: PROJECT PASSPORT */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-3xl bg-[#FAFAF8] border border-black/[0.1] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Top Document Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-white border-b border-black/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">
                PV
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11.5px] font-mono font-semibold text-[#111111] tracking-wider uppercase">
                  PROJECT PASSPORT
                </span>
                <span className="text-[11px] font-mono text-[#888888]">
                  #PV-2026-GEHU-042
                </span>
              </div>
            </div>

            {/* Verification Badge (Animates and activates) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.3 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-white text-[12px] font-['Manrope',sans-serif] font-semibold"
            >
              <ShieldCheck size={14} className="text-white" />
              <span>Faculty Verified</span>
            </motion.div>
          </div>

          {/* Document Content Body */}
          <div className="p-6 sm:p-8">
            {/* Title & Status Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-black/[0.06] gap-4">
              <div>
                <span className="text-[10.5px] uppercase tracking-wider text-[#888888] font-mono block mb-1">
                  Project Name
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#111111] font-medium tracking-tight">
                  CampusConnect
                </h3>
              </div>

              {/* Status Pill & GitHub Connected Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Active Status Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.09] text-[12px] font-['Manrope',sans-serif] font-semibold text-[#111111]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Status: Active</span>
                </div>

                {/* Real GitHub Repository Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.09] text-[12px] font-['Manrope',sans-serif] font-semibold text-[#111111]">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Connected</span>
                </div>
              </div>
            </div>

            {/* Metadata Rows: Institution, Domain, Contributors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Institution */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="p-4 rounded-2xl bg-white border border-black/[0.06]"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] mb-1">
                  <Building2 size={13} />
                  <span>Institution</span>
                </div>
                <div className="text-[14px] font-semibold text-[#111111] font-['Manrope',sans-serif]">
                  Graphic Era Hill University
                </div>
              </motion.div>

              {/* Domain */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.22, duration: 0.3 }}
                className="p-4 rounded-2xl bg-white border border-black/[0.06]"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] mb-1">
                  <Layers size={13} />
                  <span>Domain</span>
                </div>
                <div className="text-[14px] font-semibold text-[#111111] font-['Manrope',sans-serif]">
                  Web Development
                </div>
              </motion.div>

              {/* Contributors with Real Avatars */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.29, duration: 0.3 }}
                className="p-4 rounded-2xl bg-white border border-black/[0.06]"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] mb-1">
                  <Users size={13} />
                  <span>Contributors</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-[#111111] font-['Manrope',sans-serif]">
                    4 Students
                  </span>
                  {/* Real Avatars Stack */}
                  <div className="flex -space-x-1.5">
                    {['SR', 'AK', 'VN', 'PD'].map((initials, i) => (
                      <div
                        key={initials}
                        className="w-6 h-6 rounded-full bg-[#111111] text-white border-2 border-white flex items-center justify-center text-[9px] font-mono font-bold"
                        title={`Student ${i + 1}`}
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36, duration: 0.3 }}
              className="mt-4 p-4 rounded-2xl bg-white border border-black/[0.06]"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#777777] mb-2">
                <FileCode2 size={13} />
                <span>Technologies</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {['React', 'Node.js', 'MongoDB'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-[#F7F7F5] border border-black/[0.07] text-[12px] font-semibold text-[#111111] font-['Manrope',sans-serif]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectPassportSection;
