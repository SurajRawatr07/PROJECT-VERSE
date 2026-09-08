import React from 'react';
import { motion } from 'motion/react';
import { GitFork, GitCommit, Users, ArrowRight, ArrowDown, Sparkles } from 'lucide-react';

interface LineageNode {
  year: string;
  version: string;
  phase: string;
  focus: string;
  contributors: string;
  tag: string;
}

const TIMELINE_NODES: LineageNode[] = [
  {
    year: '2026',
    version: 'v1.0',
    phase: 'Idea + Initial Build',
    focus: 'Architecture setup, core database schema, and initial MVP prototype.',
    contributors: '3 Student Founders',
    tag: 'Foundation',
  },
  {
    year: '2027',
    version: 'v2.0',
    phase: 'New Contributors + Improvements',
    focus: 'Performance optimization, real-time messaging, and mobile responsive redesign.',
    contributors: '4 Successor Students + 1 Faculty',
    tag: 'Expansion',
  },
  {
    year: '2028',
    version: 'v3.0',
    phase: 'New Features + Research',
    focus: 'Edge AI processing module and IEEE conference paper publication.',
    contributors: '2 Senior Researchers',
    tag: 'Academic Research',
  },
  {
    year: '2029',
    version: 'v4.0',
    phase: 'Further Development',
    focus: 'Multi-campus deployment, cloud scalability, and institutional pilot integration.',
    contributors: 'Incoming Capstone Batch',
    tag: 'Active Lineage',
  },
];

export const ProjectLineageSection: React.FC = () => {
  return (
    <section 
      id="lineage" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-3">
            Inter-Batch Continuity
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            Projects Can Continue Across Batches.
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[16px] text-[#555555] font-sans max-w-xl mx-auto">
            Instead of restarting from zero, future students can build on what already exists.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* TIMELINE: The Same Project Flowing Forward Through 4 Years */}
        {/* ========================================================================= */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute top-6 bottom-6 left-[23px] sm:left-[31px] w-[2px] bg-black/[0.1] -z-0" />

          <div className="space-y-6 sm:space-y-8 relative z-10">
            {TIMELINE_NODES.map((item, idx) => {
              const isLatest = idx === TIMELINE_NODES.length - 1;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-4 sm:gap-6 group"
                >
                  {/* Timeline Node Marker */}
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border border-black/[0.12] shadow-[0_2px_10px_rgba(0,0,0,0.04)] group-hover:border-black/30 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200">
                    <span className="font-mono text-[13px] sm:text-[15px] font-bold text-[#111111]">
                      {item.year}
                    </span>
                  </div>

                  {/* Node Content Card */}
                  <div className="flex-1 p-5 sm:p-6 rounded-3xl bg-white border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-black/20 hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-200">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#111111] text-white text-[11px] font-mono font-medium">
                          {item.version}
                        </span>
                        <h3 className="text-[16px] sm:text-[18px] font-serif font-medium text-[#111111]">
                          {item.phase}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#F5F5F3] border border-black/[0.05] text-[#555555]">
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-[13.5px] sm:text-[14px] text-[#666666] leading-relaxed font-sans mb-4">
                      {item.focus}
                    </p>

                    <div className="flex items-center gap-2 pt-3 border-t border-black/[0.04] text-[12px] font-sans text-[#444444]">
                      <Users size={14} className="text-[#888888]" />
                      <span>{item.contributors}</span>
                    </div>
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
