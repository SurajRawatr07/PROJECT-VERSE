import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, UserCheck, ShieldCheck, ArrowDown, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#040714] border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal mb-10 sm:mb-12">
          “Proof, Not Just Claims.”
        </h2>

        {/* Verification Equation / Block */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="liquid-glass rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto border border-white/10 mb-8"
        >
          {/* Top 3 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center">
            <div className="liquid-glass-subtle rounded-xl p-3.5 flex items-center justify-center gap-2 border border-white/10">
              <GitBranch className="w-4 h-4 text-slate-300" />
              <span className="font-mono-code text-xs sm:text-sm text-slate-200 font-medium">
                GitHub Evidence
              </span>
            </div>

            <div className="hidden sm:flex justify-center text-slate-500 font-mono-code text-sm">
              +
            </div>

            <div className="liquid-glass-subtle rounded-xl p-3.5 flex items-center justify-center gap-2 border border-white/10">
              <UserCheck className="w-4 h-4 text-indigo-300" />
              <span className="font-mono-code text-xs sm:text-sm text-slate-200 font-medium">
                Faculty Review
              </span>
            </div>

            <div className="hidden sm:flex justify-center text-slate-500 font-mono-code text-sm">
              +
            </div>

            <div className="liquid-glass-subtle rounded-xl p-3.5 flex items-center justify-center gap-2 border border-white/10 sm:col-start-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-mono-code text-xs sm:text-sm text-slate-200 font-medium">
                HOD Validation
              </span>
            </div>
          </div>

          {/* Arrow down */}
          <div className="my-5 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>

          {/* Verified Project Result Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-mono-code text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-950/40">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>VERIFIED PROJECT</span>
          </div>
        </motion.div>

        {/* One line summary */}
        <p className="font-body text-slate-300/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          “Technical contribution and academic validation come together in one project record.”
        </p>
      </div>
    </section>
  );
};
