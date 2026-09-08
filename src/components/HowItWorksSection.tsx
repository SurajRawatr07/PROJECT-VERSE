import React from 'react';
import { motion } from 'motion/react';
import { Search, UserPlus, Code2, ShieldCheck, FileBadge, GitFork } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    desc: 'Find existing academic projects from different campuses.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Connect',
    desc: 'Find teammates, mentors, or faculty based on project needs.',
    icon: UserPlus,
  },
  {
    number: '03',
    title: 'Build',
    desc: 'Develop, document, and contribute to the project.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Verify',
    desc: 'Validate contributions using project evidence and academic review.',
    icon: ShieldCheck,
  },
  {
    number: '05',
    title: 'Preserve',
    desc: "Create a Project Passport containing the project's verified history.",
    icon: FileBadge,
  },
  {
    number: '06',
    title: 'Continue',
    desc: 'Future batches can improve and extend the same project.',
    icon: GitFork,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section 
      id="how-it-works" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-3">
            Six-Stage Process
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            How It Works
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-[#666666] font-sans">
            From initial discovery to cross-cohort continuity in six simple phases.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PROCESS FLOW: Horizontal on desktop (grid-cols-6) / Vertical on mobile */}
        {/* ========================================================================= */}
        <div className="relative">
          {/* Desktop Connecting Line behind cards */}
          <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-[2px] bg-black/[0.07] pointer-events-none -z-0" />

          {/* Mobile/Tablet Vertical Line */}
          <div className="lg:hidden absolute top-[24px] bottom-[24px] left-[26px] w-[2px] bg-black/[0.07] pointer-events-none -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-5 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group"
                >
                  {/* Step Circle & Icon */}
                  <div className="shrink-0 relative mb-0 lg:mb-4 mr-4 lg:mr-0">
                    <div className="w-13 h-13 rounded-2xl bg-white border border-black/[0.1] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all duration-200">
                      <Icon size={22} />
                    </div>
                    {/* Small Step Number Badge */}
                    <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-[#111111] text-white text-[9.5px] font-mono font-medium leading-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Text Container */}
                  <div className="pt-1 lg:pt-0">
                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#111111] font-sans tracking-tight mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[13px] sm:text-[13.5px] text-[#666666] leading-relaxed font-sans max-w-[200px]">
                      {step.desc}
                    </p>
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

export default HowItWorksSection;
