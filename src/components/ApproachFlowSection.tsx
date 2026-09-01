import React from 'react';
import { motion } from 'motion/react';
import { Compass, Code2, ShieldCheck, Users2, FastForward, ArrowRight, ArrowDown } from 'lucide-react';

export const ApproachFlowSection: React.FC = () => {
  const flowSteps = [
    { label: 'DISCOVER', icon: Compass },
    { label: 'BUILD', icon: Code2 },
    { label: 'VERIFY', icon: ShieldCheck },
    { label: 'COLLABORATE', icon: Users2 },
    { label: 'CONTINUE', icon: FastForward }
  ];

  return (
    <section id="approach-flow" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Heading */}
        <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold">
          Ecosystem Lifecycle
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal mb-12 sm:mb-16 mt-2">
          “From Submission to Continuation.”
        </h2>

        {/* Desktop Single Horizontal Visual Flow */}
        <div className="hidden md:flex items-center justify-center gap-2 lg:gap-3 max-w-4xl mx-auto mb-10">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="flex-1 card-white p-4 sm:p-5 flex flex-col items-center justify-center border border-black/8 hover:border-black/20 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] mb-2.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono-code text-xs font-semibold tracking-wider text-[#111111]">
                    {step.label}
                  </span>
                </motion.div>

                {idx < flowSteps.length - 1 && (
                  <div className="flex items-center justify-center text-[#737373] px-1">
                    <ArrowRight className="w-4 h-4 text-[#737373]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Vertical Flow Timeline */}
        <div className="md:hidden flex flex-col items-center gap-2 max-w-xs mx-auto mb-8">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="w-full card-white p-3.5 flex items-center justify-center gap-3 border border-black/8">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono-code text-xs font-semibold tracking-wider text-[#111111]">
                    {step.label}
                  </span>
                </div>
                {idx < flowSteps.length - 1 && (
                  <ArrowDown className="w-3.5 h-3.5 text-[#737373] my-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="font-body text-[#4A4A4A] text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
        >
          “ProjectVerse keeps academic work discoverable, trusted and useful beyond a single semester.”
        </motion.p>
      </div>
    </section>
  );
};
