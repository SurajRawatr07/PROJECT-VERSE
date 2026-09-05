import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 font-serif">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Heading */}
        <span className="text-[12px] uppercase tracking-widest text-[#737373] font-medium">
          Trust & Verification
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#111111] font-bold tracking-tight mb-4 mt-2">
          Evidence Over Assumptions
        </h2>
        <p className="text-[#4A4A4A] text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-10 sm:mb-12 tracking-wide">
          Every project is validated through automated technical metrics and institutional oversight.
        </p>

        {/* Highly Visual Equation Container */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card-white p-6 sm:p-10 max-w-3xl mx-auto border border-black/8"
        >
          {/* Equation Grid: Item + Item + Item = Result */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3">
            {/* 1. GitHub Evidence */}
            <div className="w-full md:w-auto flex-1 surface-soft rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-black/6">
              <div className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#111111] shadow-xs">
                <GitBranch className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm text-[#111111] font-bold tracking-wide">
                GitHub Evidence
              </span>
            </div>

            {/* Plus Symbol */}
            <div className="text-[#8C8C8C] text-lg font-bold select-none">
              +
            </div>

            {/* 2. Faculty Review */}
            <div className="w-full md:w-auto flex-1 surface-soft rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-black/6">
              <div className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#111111] shadow-xs">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm text-[#111111] font-bold tracking-wide">
                Faculty Review
              </span>
            </div>

            {/* Plus Symbol */}
            <div className="text-[#8C8C8C] text-lg font-bold select-none">
              +
            </div>

            {/* 3. HOD Validation */}
            <div className="w-full md:w-auto flex-1 surface-soft rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-black/6">
              <div className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#111111] shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm text-[#111111] font-bold tracking-wide">
                HOD Validation
              </span>
            </div>
          </div>

          {/* Equals Sign & Verified Outcome */}
          <div className="mt-6 pt-6 border-t border-black/8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-[#8C8C8C] text-lg font-bold select-none hidden sm:inline">
              =
            </span>
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs sm:text-sm font-bold tracking-wider shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>VERIFIED PROJECT</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
