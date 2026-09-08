import React from 'react';
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
    desc: 'Find existing projects across colleges to avoid rebuilding from scratch.',
    icon: Search,
  },
  {
    number: '02',
    title: 'CONNECT',
    desc: 'Form cross-functional teams and link with academic advisors.',
    icon: Users,
  },
  {
    number: '03',
    title: 'BUILD',
    desc: 'Collaborate with version-controlled code, tasks, and documentation.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'VERIFY',
    desc: 'Validate genuine code commits, student roles, and faculty approval.',
    icon: ShieldCheck,
  },
  {
    number: '05',
    title: 'PRESERVE',
    desc: 'Generate an immutable Project Passport with permanent lineage.',
    icon: FileBadge,
  },
  {
    number: '06',
    title: 'CONTINUE',
    desc: 'Next-semester batches fork or continue the work with full context.',
    icon: GitFork,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section 
      id="how-it-works" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header: Editorial Instrument Serif + Technical Badge */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-widest text-[#333333] mb-3">
            PLATFORM WORKFLOW
          </div>
          <h2 className="font-serif text-[32px] sm:text-[38px] md:text-[46px] text-[#111111] font-normal tracking-[-0.015em] leading-tight">
            How ProjectVerse Works
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-[#555555] font-sans max-w-xl mx-auto leading-relaxed">
            A seamless six-stage workflow ensuring academic work endures beyond final semester evaluations.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP FLOW: 6 Horizontal Steps with Thin Black Animated Arrow Connectors */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === STEPS.length - 1;

              return (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  {/* Step Box */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col items-center group"
                  >
                    {/* Top Icon Badge */}
                    <div className="relative mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.1] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center text-[#111111] group-hover:border-black group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all duration-200">
                        <Icon size={20} />
                      </div>
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-md bg-[#111111] text-white text-[10px] font-['Manrope',sans-serif] font-bold tracking-wider">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Title: Manrope Step Label */}
                    <h3 className="text-[13.5px] font-['Manrope',sans-serif] font-bold text-[#111111] tracking-wider uppercase mb-1.5">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-[12.5px] text-[#555555] font-sans leading-relaxed max-w-[170px]">
                      {step.desc}
                    </p>
                  </motion.div>

                  {/* Thin Black Animated Connector to Next Step (1.5px with small geometric arrowhead) */}
                  {!isLast && (
                    <div className="absolute top-6 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-[10px] pointer-events-none z-0">
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <marker
                            id={`hiw-arrow-${idx}`}
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
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          markerEnd={`url(#hiw-arrow-${idx})`}
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: 0.15 + idx * 0.1, ease: 'easeOut' }}
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET FLOW: Dedicated Vertical Path with Thin Black Connectors */}
        {/* ========================================================================= */}
        <div className="block lg:hidden max-w-md mx-auto">
          <div className="relative pl-6 space-y-6 border-l-[1.5px] border-black ml-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="relative flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-black/[0.09] shadow-sm"
                >
                  {/* Connection Node Indicator on Left Line */}
                  <span className="absolute -left-[31px] top-6 w-2.5 h-2.5 rounded-full bg-black border-2 border-white shadow-sm" />

                  <div className="w-10 h-10 rounded-xl bg-[#F7F7F5] border border-black/[0.06] flex items-center justify-center text-[#111111] shrink-0 mt-0.5">
                    <Icon size={18} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10.5px] font-['Manrope',sans-serif] font-bold text-[#666666] tracking-wider">
                        STEP {step.number}
                      </span>
                      <span className="text-[13px] font-['Manrope',sans-serif] font-bold text-[#111111] uppercase tracking-wide">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-[#555555] font-sans leading-relaxed">
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
