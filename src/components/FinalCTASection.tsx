import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface FinalCTASectionProps {
  onExploreClick: () => void;
  onGetStartedClick: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onExploreClick,
  onGetStartedClick,
}) => {
  return (
    <section 
      id="cta" 
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-white border-t border-black/[0.06] overflow-hidden select-none"
    >
      {/* Subtle background ProjectVerse watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025] -z-0">
        <ProjectVerseLogo size={520} color="#000000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Small Tag */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7F7F5] border border-black/[0.08] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-6"
        >
          <span>Start Building Today</span>
        </motion.div>

        {/* Heading: “Build it. Verify it. Continue it.” */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#111111] font-normal tracking-[-0.015em] leading-[1.1] max-w-2xl mx-auto"
        >
          Build it. Verify it. Continue it.
        </motion.h2>

        {/* Supporting Line: “Give every academic project a future.” */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="mt-4 sm:mt-5 text-[16px] sm:text-[18px] text-[#555555] font-sans max-w-lg mx-auto"
        >
          Give every academic project a future.
        </motion.p>

        {/* Action Buttons: Explore ProjectVerse & Get Started */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-sans"
        >
          <button
            id="cta-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F7F7F5] text-[#111111] border border-black/[0.12] shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-[14px] sm:text-[15px] font-medium transition-all duration-200 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#111111]" />
            <span>Explore ProjectVerse</span>
          </button>

          <button
            id="cta-get-started-btn"
            onClick={onGetStartedClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#111111] hover:bg-black text-white text-[14px] sm:text-[15px] font-medium shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.16)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
