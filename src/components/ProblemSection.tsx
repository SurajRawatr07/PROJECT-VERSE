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
    desc: 'Valuable projects remain scattered across campuses.',
    icon: SearchX,
  },
  {
    title: 'Repeated Work',
    desc: 'Students often rebuild solutions that already exist.',
    icon: RotateCcw,
  },
  {
    title: 'No Continuity',
    desc: 'Projects frequently stop when the batch graduates.',
    icon: ClockAlert,
  },
  {
    title: 'Unclear Contribution',
    desc: 'It is difficult to prove who actually built what.',
    icon: UserX,
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section 
      id="about" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-3">
            Academic Status Quo
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            The Problem
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-[#666666] font-sans">
            Academic innovation is hindered by isolated repositories and lost momentum.
          </p>
        </div>

        {/* 4 Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PROBLEMS.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3 }}
                className="p-6 rounded-3xl bg-white border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#F7F7F5] border border-black/[0.06] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200 mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-[17px] sm:text-[18px] font-medium text-[#111111] tracking-tight font-serif mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] text-[#666666] leading-relaxed font-sans">
                    {problem.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-black/[0.04] text-[11px] font-mono text-[#888888]">
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
