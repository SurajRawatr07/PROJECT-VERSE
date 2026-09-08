import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitBranch, CheckCircle2 } from 'lucide-react';

interface BatchEpoch {
  year: string;
  version: string;
  title: string;
  milestone: string;
  cohort: string;
  avatars: string[];
}

const LINEAGE_EPOCHS: BatchEpoch[] = [
  {
    year: '2026',
    version: 'v1.0',
    title: 'Initial Build',
    milestone: 'Core architecture & auth prototype',
    cohort: 'Class of 2026',
    avatars: ['SR', 'AK'],
  },
  {
    year: '2027',
    version: 'v2.0',
    title: 'New Contributors',
    milestone: 'Cross-campus indexing & REST API',
    cohort: 'Class of 2027',
    avatars: ['VN', 'PD', 'ML'],
  },
  {
    year: '2028',
    version: 'v3.0',
    title: 'Feature Expansion',
    milestone: 'Faculty rubric & automated proof audit',
    cohort: 'Class of 2028',
    avatars: ['RS', 'TC'],
  },
  {
    year: '2029',
    version: 'v4.0',
    title: 'Further Development',
    milestone: 'Multi-institutional federated storage',
    cohort: 'Class of 2029',
    avatars: ['NP', 'DW', 'JS'],
  },
];

export const ProjectLineageSection: React.FC = () => {
  const [hoveredEpoch, setHoveredEpoch] = useState<number | null>(null);

  return (
    <section 
      id="lineage" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-widest text-[#333333] mb-3">
            MULTI-COHORT CONTINUITY
          </div>
          {/* Main Statement in Instrument Serif */}
          <h2 className="font-serif text-[32px] sm:text-[38px] md:text-[46px] text-[#111111] font-normal tracking-[-0.015em] leading-tight">
            Projects Can Continue Across Batches.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-[#555555] font-sans leading-relaxed">
            Future student cohorts build directly upon proven foundations instead of discarding valuable academic progress.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* REAL UI TIMELINE: Thin Pure Black Timeline (Stroke: 1.4px, Minimal Arrowheads) */}
        {/* Animated: Path drawing, year activation, version badges, contributor avatars */}
        {/* ========================================================================= */}
        <div className="relative w-full">
          {/* Desktop Continuous Pure Black Line (1.4px) */}
          <div className="hidden lg:block absolute top-[36px] left-[7%] right-[7%] h-[12px] pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <marker
                  id="lineage-small-black-arrow"
                  viewBox="0 0 6 6"
                  refX="5"
                  refY="3"
                  markerWidth="4"
                  markerHeight="4"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 5 3 L 0 5 Z" fill="#000000" />
                </marker>
              </defs>
              <motion.line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#000000"
                strokeWidth="1.4"
                strokeLinecap="round"
                markerEnd="url(#lineage-small-black-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </div>

          {/* Mobile/Tablet Vertical Pure-Black Line (1.4px) */}
          <div className="lg:hidden absolute top-[20px] bottom-[20px] left-[24px] w-[1.4px] bg-black pointer-events-none z-0" />

          {/* 4 Epoch Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 relative z-10">
            {LINEAGE_EPOCHS.map((epoch, idx) => {
              const isHovered = hoveredEpoch === idx;
              return (
                <motion.div
                  key={epoch.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setHoveredEpoch(idx)}
                  onMouseLeave={() => setHoveredEpoch(null)}
                  className={`p-5 rounded-2xl bg-white border transition-all duration-200 ${
                    isHovered
                      ? 'border-black shadow-[0_4px_20px_rgba(0,0,0,0.06)] -translate-y-1'
                      : 'border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  {/* Top: Compact Technical Year Label (Manrope with increased spacing) + Version Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + idx * 0.12, duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                      <span className="font-['Manrope',sans-serif] text-[18px] font-bold text-[#111111] tracking-wider">
                        {epoch.year}
                      </span>
                    </motion.div>

                    {/* Version Badge */}
                    <motion.span 
                      initial={{ scale: 0.85, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.32 + idx * 0.12, duration: 0.25 }}
                      className="px-2 py-0.5 rounded-md bg-[#F5F5F3] border border-black/[0.08] text-[11px] font-['Manrope',sans-serif] font-bold text-[#111111] tracking-wide"
                    >
                      {epoch.version}
                    </motion.span>
                  </div>

                  {/* Title & Milestone */}
                  <h3 className="text-[14.5px] font-['Manrope',sans-serif] font-bold text-[#111111] mb-1">
                    {epoch.title}
                  </h3>
                  <p className="text-[12.5px] text-[#666666] font-sans leading-relaxed mb-4">
                    {epoch.milestone}
                  </p>

                  {/* Cohort & Contributor Avatars */}
                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-['Manrope',sans-serif] font-medium text-[#777777]">
                      {epoch.cohort}
                    </span>

                    {/* Contributor Avatars Reveal */}
                    <motion.div 
                      initial={{ opacity: 0, x: 4 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.12, duration: 0.3 }}
                      className="flex -space-x-1.5"
                    >
                      {epoch.avatars.map((av) => (
                        <div
                          key={av}
                          className="w-5 h-5 rounded-full bg-[#111111] text-white border border-white flex items-center justify-center text-[8px] font-['Manrope',sans-serif] font-bold"
                          title={`Contributor: ${av}`}
                        >
                          {av}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectLineageSection;
