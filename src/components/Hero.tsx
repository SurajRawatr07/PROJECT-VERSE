import React, { useState } from 'react';
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
  const [videoError, setVideoError] = useState(false);

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#040714] pt-28 pb-16 px-4 sm:px-6"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-30 filter brightness-75 contrast-110"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-[#040714]/80 to-[#040714]" />
        )}

        {/* Contrast Overlays for Cinematic Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-[#040714]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040714]/80 via-transparent to-[#040714]/80" />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border-indigo-400/20 mb-6 text-xs font-medium text-indigo-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="tracking-widest uppercase text-[11px] sm:text-xs font-mono-code">
            PROJECTVERSE • ACADEMIC PROJECT ECOSYSTEM
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-tight leading-[1.08] sm:leading-[1.06] max-w-3xl"
        >
          “Your Projects Shouldn’t End With Submission.”
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-body text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl leading-relaxed font-normal"
        >
          Discover valuable academic work, collaborate with the right people, get verified, and give every project a future.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-950 font-semibold text-sm sm:text-base hover:bg-slate-100 shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-200 active:scale-95 group cursor-pointer"
          >
            <Compass className="w-4 h-4 text-slate-900 group-hover:rotate-45 transition-transform duration-300" />
            <span>Explore ProjectVerse</span>
          </button>

          <button
            id="hero-get-started-btn"
            onClick={onGetStartedClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-glass text-white font-medium text-sm sm:text-base hover:bg-white/10 border-white/20 hover:border-white/30 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-indigo-300" />
          </button>
        </motion.div>

        {/* Small line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-400 font-body"
        >
          <span>Students</span>
          <span className="text-slate-600 font-bold">•</span>
          <span>Faculty</span>
          <span className="text-slate-600 font-bold">•</span>
          <span>HODs</span>
          <span className="text-slate-600 font-bold">•</span>
          <span>Institutions</span>
        </motion.div>
      </div>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#040714] to-transparent pointer-events-none" />
    </section>
  );
};
