import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface SplashIntroProps {
  onComplete: () => void;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'logo' | 'text' | 'exit'>('logo');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Respect OS preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      onComplete();
      return;
    }

    // Step 1 -> Step 2 (Reveal wordmark after logo appears)
    const timer1 = setTimeout(() => {
      setStage('text');
    }, 600);

    // Step 2 -> Step 3 (Start exit transition)
    const timer2 = setTimeout(() => {
      setStage('exit');
    }, 1450);

    // Step 3 completion (Unmount overlay and reveal homepage)
    const timer3 = setTimeout(() => {
      onComplete();
    }, 1950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (reducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        id="pv-splash-intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'exit' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={onComplete}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFFFFF] cursor-pointer select-none overflow-hidden font-serif"
        title="Click to skip"
      >
        {/* Centered Brand Presentation */}
        <div className="relative flex flex-col items-center text-center px-4">
          {/* STEP 1: Geometric PV Logo with subtle scale and blur-to-sharp */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center mb-6"
          >
            <ProjectVerseLogo
              size={52}
              color="#111111"
              accentColor="#111111"
              className="drop-shadow-xs"
            />
          </motion.div>

          {/* STEP 2: Smooth Wordmark Reveal (PROJECT VERSE) */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{
              opacity: stage === 'text' || stage === 'exit' ? 1 : 0,
              y: stage === 'text' || stage === 'exit' ? 0 : 10,
              filter: stage === 'text' || stage === 'exit' ? 'blur(0px)' : 'blur(6px)',
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-baseline justify-center select-none font-serif text-[#111111]"
          >
            {/* PROJECT: Smaller, refined uppercase */}
            <span className="text-[20px] sm:text-[24px] tracking-[0.14em] font-normal text-[#4A4A4A] inline-block">
              PROJECT
            </span>

            <span className="inline-block w-2.5 sm:w-3" aria-hidden="true" />

            {/* VERSE: Stronger visual weight */}
            <span className="text-[24px] sm:text-[28px] tracking-[-0.015em] text-[#111111] inline-block font-bold">
              VERSE
            </span>
          </motion.div>

          {/* Discreet subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'text' || stage === 'exit' ? 0.7 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-3 text-[12px] uppercase tracking-[0.16em] text-[#737373]"
          >
            Academic Project Ecosystem
          </motion.p>
        </div>

        {/* Subtle skip prompt */}
        <div className="absolute bottom-8 text-[11px] text-[#A3A3A3] tracking-wider uppercase opacity-60">
          Press anywhere to skip
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashIntro;
