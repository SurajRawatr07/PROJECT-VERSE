import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Users, Code2, ShieldCheck, FileBadge, GitFork } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    desc: 'Find existing projects across campuses.',
    icon: Search,
  },
  {
    number: '02',
    title: 'CONNECT',
    desc: 'Find teammates, mentors, or faculty.',
    icon: Users,
  },
  {
    number: '03',
    title: 'BUILD',
    desc: 'Develop and document the project.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'VERIFY',
    desc: 'Validate contributions and academic authenticity.',
    icon: ShieldCheck,
  },
  {
    number: '05',
    title: 'PRESERVE',
    desc: 'Create a Project Passport.',
    icon: FileBadge,
  },
  {
    number: '06',
    title: 'CONTINUE',
    desc: 'Allow future batches to extend the project.',
    icon: GitFork,
  },
];

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="how-it-works" 
      className="relative w-full py-18 sm:py-24 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#555555] mb-3">
            Platform Workflow
          </div>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[40px] text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            How It Works
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] font-sans">
            A single connected process linking project creation with multi-cohort progression.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PROCESS FLOW: Continuous Pure-Black SVG Path Connecting All Stages */}
        {/* ========================================================================= */}
        <div className="relative">
          {/* Desktop Continuous Pure-Black SVG Connector */}
          <div className="hidden lg:block absolute top-[28px] left-[7%] right-[7%] h-[2px] pointer-events-none -z-0">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <marker
                  id="hiw-black-arrow"
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
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Mobile/Tablet Vertical Pure-Black Line */}
          <div className="lg:hidden absolute top-[24px] bottom-[24px] left-[27px] w-[2px] bg-black pointer-events-none -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-4 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === idx;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group"
                >
                  {/* Step Circle & Icon */}
                  <div className="shrink-0 relative mb-0 lg:mb-4 mr-4 lg:mr-0">
                    <div
                      className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                        isCurrent
                          ? 'bg-[#111111] text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] scale-105'
                          : 'bg-white border border-black/[0.1] text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    {/* Step Number Badge */}
                    <span
                      className={`absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold leading-none ${
                        isCurrent ? 'bg-white text-[#111111] border border-black' : 'bg-[#111111] text-white'
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="pt-0.5 lg:pt-0">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-[#111111] font-['Manrope',sans-serif] tracking-wide mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[12.5px] sm:text-[13px] text-[#555555] leading-relaxed font-sans max-w-[190px]">
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
