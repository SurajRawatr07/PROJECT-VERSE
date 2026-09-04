import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface HeroProps {
  onExploreClick: () => void;
  onGetStartedClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onGetStartedClick,
}) => {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[82vh] flex items-center justify-center bg-[#FFFFFF] pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 overflow-hidden font-serif"
    >
      {/* Subtle background depth */}
      <div className="absolute inset-0 bg-radial from-black/[0.015] via-transparent to-transparent pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Compact PV Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAFA] border border-black/8 shadow-xs mb-8"
        >
          <ProjectVerseLogo size={18} color="#111111" />
          <span className="text-[12px] uppercase tracking-widest text-[#4A4A4A] font-semibold">
            Smart Education • SIH 2026
          </span>
        </motion.div>

        {/* Visually Dominant Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-[#111111] font-bold tracking-tight leading-[1.05] sm:leading-[1.03] max-w-4xl uppercase"
        >
          Your Projects<br />
          Shouldn't End<br />
          With Submission.
        </motion.h1>

        {/* Concise Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#4A4A4A] max-w-2xl leading-relaxed font-normal tracking-wide"
        >
          Discover academic work, collaborate with the right people, get verified, and give every project a future.
        </motion.p>

        {/* Action Buttons: [Explore Projects] [Get Started] */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="btn-secondary-white w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 cursor-pointer text-sm sm:text-base font-semibold group rounded-full shadow-xs hover:border-black/20 tracking-wide font-serif"
          >
            <Compass className="w-4 h-4 text-[#111111] group-hover:rotate-45 transition-transform duration-300" />
            <span>Explore Projects</span>
          </button>

          <button
            id="hero-get-started-btn"
            onClick={onGetStartedClick}
            className="btn-primary-black w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 cursor-pointer text-sm sm:text-base font-semibold rounded-full shadow-sm hover:shadow-md tracking-wide font-serif"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>

        {/* Audience Hierarchy Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 sm:mt-14 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-[#737373] tracking-wide"
        >
          <span className="text-[#4A4A4A] font-semibold">Students</span>
          <span className="text-black/20 font-bold">•</span>
          <span className="text-[#4A4A4A] font-semibold">Faculty</span>
          <span className="text-black/20 font-bold">•</span>
          <span className="text-[#4A4A4A] font-semibold">HODs</span>
          <span className="text-black/20 font-bold">•</span>
          <span className="text-[#4A4A4A] font-semibold">Institutions</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
