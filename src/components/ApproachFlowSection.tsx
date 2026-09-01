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
    <section id="approach-flow" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#040714] border-t border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal mb-12 sm:mb-16">
          “From Submission to Continuation.”
        </h2>

        {/* Desktop Single Horizontal Visual Flow */}
        <div className="hidden md:flex items-center justify-center gap-2 lg:gap-3 max-w-4xl mx-auto mb-10">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex-1 liquid-glass rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border border-white/10 hover:border-indigo-400/40 hover:bg-white/5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-300 mb-2.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono-code text-xs font-semibold tracking-wider text-slate-100">
                    {step.label}
                  </span>
                </motion.div>

                {idx < flowSteps.length - 1 && (
                  <div className="flex items-center justify-center text-slate-500 px-1">
                    <ArrowRight className="w-4 h-4 text-indigo-400/70" />
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
                <div className="w-full liquid-glass rounded-xl p-3.5 flex items-center justify-center gap-3 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-indigo-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono-code text-xs font-semibold tracking-wider text-white">
                    {step.label}
                  </span>
                </div>
                {idx < flowSteps.length - 1 && (
                  <ArrowDown className="w-3.5 h-3.5 text-indigo-400/60 my-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Small supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-body text-slate-300/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
        >
          “ProjectVerse keeps academic projects discoverable, verifiable and useful beyond a single semester.”
        </motion.p>
      </div>
    </section>
  );
};
