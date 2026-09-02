import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';
import { ProjectVerseBrand } from './ProjectVerseBrand';

interface HeroProps {
  onExploreClick: () => void;
  onGetStartedClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onGetStartedClick
}) => {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#FFFFFF] pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Subtle depth layer */}
      <div className="absolute inset-0 bg-radial from-black/[0.015] via-transparent to-transparent pointer-events-none" />

      {/* Main Hero Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Consistent PROJECT VERSE Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAFAFA] border border-black/8 shadow-xs mb-8"
        >
          <ProjectVerseBrand
            logoSize={18}
            textSizeClassName="text-[13px] sm:text-[14px]"
            interactive={false}
          />
        </motion.div>

        {/* Main Heading in Instrument Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-[#111111] font-normal tracking-tight leading-[1.08] sm:leading-[1.05] max-w-3xl"
        >
          Your Projects Shouldn’t<br className="hidden sm:inline" /> End With Submission.
        </motion.h1>

        {/* Supporting text in refined sans-serif */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-7 font-body text-base sm:text-lg md:text-xl text-[#4A4A4A] max-w-2xl leading-relaxed font-normal"
        >
          Discover valuable academic work, collaborate with the right people, get verified, and give every project a future.
        </motion.p>

        {/* Action Buttons: [Explore ProjectVerse] [Get Started] */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="btn-secondary-white w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 cursor-pointer text-sm sm:text-base font-medium group"
          >
            <Compass className="w-4 h-4 text-[#111111] group-hover:rotate-45 transition-transform duration-300" />
            <span>Explore ProjectVerse</span>
          </button>

          <button
            id="hero-get-started-btn"
            onClick={onGetStartedClick}
            className="btn-primary-black w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 cursor-pointer text-sm sm:text-base font-medium"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>

        {/* Minimal Audience Indicator Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-12 sm:mt-14 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-[#737373] font-body"
        >
          <span className="text-[#4A4A4A] font-medium">Students</span>
          <span className="text-black/25 font-bold">•</span>
          <span className="text-[#4A4A4A] font-medium">Faculty</span>
          <span className="text-black/25 font-bold">•</span>
          <span className="text-[#4A4A4A] font-medium">HODs</span>
          <span className="text-black/25 font-bold">•</span>
          <span className="text-[#4A4A4A] font-medium">Institutions</span>
        </motion.div>
      </div>
    </section>
  );
};
