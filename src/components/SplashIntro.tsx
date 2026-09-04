import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface SplashIntroProps {
  onComplete: () => void;
}

export const SplashIntro: React.FC<SplashIntroProps> = ({ onComplete }) => {
  // Animation stages based on the exact 3-second sequence:
  // 0.0s - 0.8s: Logo appears
  // 0.8s - 2.0s: Wordmark reveals
  // 2.0s - 2.4s: Hold completed identity
  // 2.4s - 3.0s: Smooth fade-out into homepage (at 3.0s exact, unmounted)
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check OS preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setShowText(true);
      const exitTimer = setTimeout(() => setIsExiting(true), 2400);
      const completeTimer = setTimeout(onComplete, 3000);
      return () => {
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }

    // 0.8s: Reveal PROJECT VERSE wordmark
    const timerText = setTimeout(() => {
      setShowText(true);
    }, 800);

    // 2.4s: Begin smooth transition into homepage
    const timerExit = setTimeout(() => {
      setIsExiting(true);
    }, 2400);

    // 3.0s: EXACTLY 3 SECONDS total duration -> unmount and make site interactive
    const timerComplete = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timerText);
      clearTimeout(timerExit);
      clearTimeout(timerComplete);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="pv-splash-intro"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.015 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={onComplete}
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFFFFF] select-none overflow-hidden font-serif ${
          isExiting ? 'pointer-events-none' : 'cursor-pointer'
        }`}
        title="Click to skip"
        role="dialog"
        aria-label="ProjectVerse Introduction"
      >
        {/* Centered Brand Presentation */}
        <div className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full max-w-lg mx-auto">
          {/* 0.0s – 0.8s: Geometric PV Logo with subtle fade-in, small scale-up, smooth ease-out */}
          <motion.div
            initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center mb-4 sm:mb-5"
          >
            {/* Responsively sized PV emblem */}
            <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-18 md:h-18 flex items-center justify-center">
              <ProjectVerseLogo
                size={58}
                color="#111111"
                accentColor="#111111"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* 0.8s – 2.0s: PROJECT VERSE Wordmark Reveal in Times New Roman */}
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    y: 8,
                    filter: 'blur(5px)',
                    letterSpacing: '0.28em',
                  }
            }
            animate={{
              opacity: showText ? 1 : 0,
              y: showText ? 0 : 8,
              filter: showText ? 'blur(0px)' : 'blur(5px)',
              letterSpacing: showText ? '0.18em' : '0.28em',
            }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center whitespace-nowrap text-center select-none font-serif text-[#111111]"
          >
            <span className="text-[19px] xs:text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-[0.16em] sm:tracking-[0.2em] text-[#111111] uppercase">
              PROJECT VERSE
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashIntro;
