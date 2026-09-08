import React from 'react';
import { motion } from 'motion/react';
import { SearchX, RotateCcw, ClockAlert, UserX } from 'lucide-react';

interface ProblemCard {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const PROBLEMS: ProblemCard[] = [
  {
    title: 'Hard to Discover',
    desc: 'Projects remain scattered across campuses.',
    icon: SearchX,
  },
  {
    title: 'Repeated Work',
    desc: 'Students rebuild solutions that may already exist.',
    icon: RotateCcw,
  },
  {
    title: 'No Continuity',
    desc: 'Projects often stop when a batch graduates.',
    icon: ClockAlert,
  },
  {
    title: 'Unclear Contribution',
    desc: 'It can be difficult to verify who built what.',
    icon: UserX,
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative w-full py-18 sm:py-24 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header: 36–44px desktop / 27–32px mobile */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#555555] mb-3">
            Academic Status Quo
          </div>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[40px] text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            The Problem
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] font-sans">
            Valuable academic projects routinely encounter structural barriers before reaching maturity.
          </p>
        </div>

        {/* 4 Compact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          {PROBLEMS.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -2 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.08] shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:border-black/25 transition-all duration-150 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F7F7F5] border border-black/[0.06] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-150 mb-4">
                    <Icon size={19} />
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#111111] font-['Manrope',sans-serif] tracking-tight mb-1.5">
                    {problem.title}
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] text-[#555555] leading-relaxed font-sans">
                    {problem.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-black/[0.05] text-[11px] font-mono text-[#888888]">
                  FRICTION 0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
