import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, UserCheck, ShieldCheck, ArrowDown, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Heading */}
        <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold">
          Verification Model
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal mb-10 sm:mb-12 mt-2">
          “Proof, Not Just Claims.”
        </h2>

        {/* Verification Equation / Block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="card-white p-6 sm:p-8 max-w-3xl mx-auto mb-8"
        >
          {/* Top 3 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center">
            <div className="surface-soft rounded-xl p-3.5 flex items-center justify-center gap-2 border border-black/6">
              <GitBranch className="w-4 h-4 text-[#111111]" />
              <span className="font-mono-code text-xs sm:text-sm text-[#111111] font-medium">
                GitHub Evidence
              </span>
            </div>

            <div className="hidden sm:flex justify-center text-[#737373] font-mono-code text-sm">
              +
            </div>

            <div className="surface-soft rounded-xl p-3.5 flex items-center justify-center gap-2 border border-black/6">
              <UserCheck className="w-4 h-4 text-[#111111]" />
              <span className="font-mono-code text-xs sm:text-sm text-[#111111] font-medium">
                Faculty Review
              </span>
            </div>

            <div className="hidden sm:flex justify-center text-[#737373] font-mono-code text-sm">
              +
            </div>

            <div className="surface-soft rounded-xl p-3.5 flex items-center justify-center gap-2 border border-black/6 sm:col-start-3">
              <ShieldCheck className="w-4 h-4 text-[#111111]" />
              <span className="font-mono-code text-xs sm:text-sm text-[#111111] font-medium">
                HOD Validation
              </span>
            </div>
          </div>

          {/* Arrow down */}
          <div className="my-5 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#F5F5F3] border border-black/8 flex items-center justify-center text-[#111111]">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>

          {/* Verified Project Result Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#F5F5F3] border border-black/10 text-[#111111] font-mono-code text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#111111]" />
            <span>VERIFIED PROJECT RECORD</span>
          </div>
        </motion.div>

        {/* Supporting Line */}
        <p className="font-body text-[#4A4A4A] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          “Technical contribution and academic validation come together in one trusted, immutable project record.”
        </p>
      </div>
    </section>
  );
};
