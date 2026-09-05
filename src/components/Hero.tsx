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
      className="relative w-full min-h-[78vh] flex items-center justify-center bg-[#FFFFFF] pt-32 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden font-serif"
    >
      {/* Subtle background layer */}
      <div className="absolute inset-0 bg-radial from-black/[0.012] via-transparent to-transparent pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Brand Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAFA] border border-black/8 shadow-xs mb-6 sm:mb-8"
        >
          <ProjectVerseLogo size={17} color="#111111" />
          <span className="text-[12px] uppercase tracking-widest text-[#4A4A4A] font-medium">
            Academic Projects • Connected People • Continuous Progress
          </span>
        </motion.div>

        {/* Hero Heading: Paints immediately for optimal LCP */}
        <h1
          className="font-serif text-[32px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] text-[#111111] font-bold tracking-tight leading-[0.98] sm:leading-[1.02] md:leading-[1.04] max-w-xl sm:max-w-2xl uppercase"
        >
          YOUR PROJECT<br />
          SHOULD GO FURTHER.
        </h1>

        {/* Supporting Text: Paints immediately */}
        <p
          className="mt-5 sm:mt-6 text-[14.5px] sm:text-[15.5px] md:text-[16.5px] lg:text-[17px] text-[#4A4A4A] max-w-[560px] leading-relaxed tracking-wide"
        >
          Discover projects, collaborate with the right people, get verified, and keep your work moving forward.
        </p>

        {/* Buttons: [Explore Projects] [Get Started] */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="btn-secondary-white w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 cursor-pointer text-[15px] sm:text-[16px] font-medium group rounded-full shadow-xs hover:border-black/20 tracking-wide font-serif"
          >
            <Compass className="w-4 h-4 text-[#111111] group-hover:rotate-45 transition-transform duration-300" />
            <span>Explore Projects</span>
          </button>

          <button
            id="hero-get-started-btn"
            onClick={onGetStartedClick}
            className="btn-primary-black w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 cursor-pointer text-[15px] sm:text-[16px] font-medium rounded-full shadow-xs hover:shadow-sm tracking-wide font-serif"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>

        {/* Small Supporting Text: Students • Faculty • HODs • Institutions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-10 sm:mt-12 flex items-center justify-center flex-wrap gap-2 text-[13px] sm:text-[14px] text-[#737373] tracking-wide"
        >
          <span className="text-[#4A4A4A] font-medium">Students</span>
          <span className="text-black/20">•</span>
          <span className="text-[#4A4A4A] font-medium">Faculty</span>
          <span className="text-black/20">•</span>
          <span className="text-[#4A4A4A] font-medium">HODs</span>
          <span className="text-black/20">•</span>
          <span className="text-[#4A4A4A] font-medium">Institutions</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
