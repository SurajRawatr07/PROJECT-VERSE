import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';

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
      className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6 transition-colors duration-300"
    >
      {/* Premium Static Cinematic Background (No video, perfectly readable) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
        {/* Soft centered ambient radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[950px] h-[450px] sm:h-[550px] bg-indigo-500/[0.04] dark:bg-indigo-500/[0.06] rounded-full blur-[100px] pointer-events-none" />
        
        {/* Extremely subtle secondary ambient depth */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-slate-400/[0.02] dark:bg-indigo-400/[0.03] rounded-full blur-[80px] pointer-events-none" />
        
        {/* Faint horizontal baseline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 dark:via-white/10 to-transparent" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border-indigo-400/20 mb-7 text-xs font-medium text-indigo-400 dark:text-indigo-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="tracking-widest uppercase text-[11px] sm:text-xs font-mono-code font-semibold">
            PROJECTVERSE • ACADEMIC PROJECT ECOSYSTEM
          </span>
        </motion.div>

        {/* Main Heading in Instrument Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-tight leading-[1.08] sm:leading-[1.06] max-w-3xl"
        >
          “Your Projects Shouldn’t End With Submission.”
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-body text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl leading-relaxed font-normal"
        >
          Discover valuable academic work, collaborate with the right people, get verified, and give every project a future.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0A0F14] font-medium text-sm sm:text-base hover:bg-slate-100 shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#0A0F14] group-hover:rotate-45 transition-transform duration-300" />
            <span>Explore ProjectVerse</span>
          </button>

          <button
            id="hero-get-started-btn"
            onClick={onGetStartedClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-glass text-white font-medium text-sm sm:text-base hover:bg-white/10 border-white/20 hover:border-white/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </button>
        </motion.div>

        {/* Audience Pill Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-400 font-body"
        >
          <span>Students</span>
          <span className="text-slate-500 font-bold">•</span>
          <span>Faculty</span>
          <span className="text-slate-500 font-bold">•</span>
          <span>HODs</span>
          <span className="text-slate-500 font-bold">•</span>
          <span>Institutions</span>
        </motion.div>
      </div>
    </section>
  );
};
