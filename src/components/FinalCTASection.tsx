import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';

interface FinalCTAProps {
  onExploreClick: () => void;
  onGetStartedClick: () => void;
}

export const FinalCTASection: React.FC<FinalCTAProps> = ({
  onExploreClick,
  onGetStartedClick,
}) => {
  return (
    <section 
      id="cta" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-black/[0.06] overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Subtle Horizontal Framing Lines */}
        <div className="w-16 h-[1px] bg-black/20 mb-8" />

        {/* Small Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F5F3] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#555555] mb-5">
          Join ProjectVerse
        </div>

        {/* Main Heading in Instrument Serif: 36–44px desktop / 28–32px mobile */}
        <h2 className="font-serif text-[34px] sm:text-[44px] md:text-[54px] text-[#111111] font-normal tracking-[-0.015em] leading-[1.1] max-w-2xl">
          Build It. Verify It. Continue It.
        </h2>

        {/* Supporting Line: Inter font */}
        <p className="mt-4 sm:mt-5 text-[16px] sm:text-[18px] text-[#555555] font-sans max-w-md">
          Give every academic project a future.
        </p>

        {/* Buttons: Explore Projects & Get Started */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto font-['Manrope',sans-serif]">
          <button
            id="cta-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white hover:bg-[#F7F7F5] text-[#111111] border border-black/[0.12] shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-[14px] sm:text-[15px] font-semibold transition-all duration-150 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#111111]" />
            <span>Explore Projects</span>
          </button>

          <button
            id="cta-get-started-btn"
            onClick={onGetStartedClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#111111] hover:bg-black text-white text-[14px] sm:text-[15px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Clean Typographic Baseline Divider */}
        <div className="w-16 h-[1px] bg-black/20 mt-12" />
      </div>
    </section>
  );
};

export default FinalCTASection;
