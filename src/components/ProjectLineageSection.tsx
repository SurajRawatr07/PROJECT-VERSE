import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitBranch, GitMerge, ArrowRight, CheckCircle2 } from 'lucide-react';

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
      className="relative w-full py-18 sm:py-24 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#555555] mb-3">
            Multi-Cohort Continuity
          </div>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[40px] text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            Projects Can Continue Across Batches.
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] font-sans">
            Future students build on existing knowledge instead of starting from zero.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* REAL UI TIMELINE: One Continuous PURE BLACK SVG Timeline */}
        {/* ========================================================================= */}
        <div className="relative w-full">
          {/* Desktop Continuous Black Line */}
          <div className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-[2px] pointer-events-none -z-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <marker
                  id="lineage-black-arrow"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L6,3 L0,6 Z" fill="#000000" />
                </marker>
              </defs>
              <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Mobile/Tablet Vertical Pure-Black Line */}
          <div className="lg:hidden absolute top-[20px] bottom-[20px] left-[24px] w-[2px] bg-black pointer-events-none -z-0" />

          {/* 4 Epoch Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 relative z-10">
            {LINEAGE_EPOCHS.map((epoch, idx) => {
              const isHovered = hoveredEpoch === idx;
              return (
                <motion.div
                  key={epoch.year}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
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
                  {/* Top: Year + Version Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-black" />
                      <span className="font-serif text-[22px] font-bold text-[#111111]">
                        {epoch.year}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-md bg-[#F5F5F3] border border-black/[0.08] text-[11px] font-mono font-bold text-[#111111]">
                      {epoch.version}
                    </span>
                  </div>

                  {/* Title & Milestone */}
                  <h3 className="text-[15px] font-bold text-[#111111] font-['Manrope',sans-serif] tracking-tight mb-1">
                    {epoch.title}
                  </h3>
                  <p className="text-[12.5px] text-[#555555] leading-snug font-sans mb-4 min-h-[34px]">
                    {epoch.milestone}
                  </p>

                  {/* Contributor Avatars & Cohort */}
                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#777777]">
                      {epoch.cohort}
                    </span>

                    {/* Contributor Avatars */}
                    <div className="flex -space-x-1.5">
                      {epoch.avatars.map((initials) => (
                        <div
                          key={initials}
                          className="w-5.5 h-5.5 rounded-full bg-[#111111] text-white border border-white flex items-center justify-center text-[8.5px] font-mono font-bold"
                          title={`Contributor ${initials}`}
                        >
                          {initials}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Supporting Line Underneath */}
        <div className="mt-12 text-center">
          <p className="text-[13.5px] font-sans text-[#666666]">
            Every commit, PR, and faculty appraisal becomes part of the permanent immutable lineage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectLineageSection;
