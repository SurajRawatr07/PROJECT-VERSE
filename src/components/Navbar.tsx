import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';
import { ProjectVerseBrand } from './ProjectVerseBrand';
import { AccountIcon } from './icons/AccountIcon';
import { prefetchView } from '../lib/prefetchService';
import { BottomNavBar } from './BottomNavBar';

export type PublicPage = 'home' | 'about' | 'how-it-works' | 'faq';

// Re-export ProjectVerseLogo & ProjectVerseBrand for seamless application-wide access
export { ProjectVerseLogo, ProjectVerseBrand, BottomNavBar };

interface NavbarProps {
  currentPage: PublicPage;
  onSelectPage: (page: PublicPage) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  onOpenLogin,
  onOpenRegister,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll position with high performance passive listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PublicPage) => {
    onSelectPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 
        =========================================================================
        TOP ANCHOR CONTAINER
        Strictly anchored at top-3.5 sm:top-4 across all viewports.
        Zero vertical slide or downward translation on scroll.
        =========================================================================
      */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex items-center justify-center px-3 sm:px-6 pointer-events-none">
        <motion.nav
          id="main-navbar"
          initial={false}
          animate={{
            scale: isScrolled ? 0.985 : 1,
            y: 0,
          }}
          transition={{
            duration: 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`pointer-events-auto rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] flex items-center justify-between transition-[padding,height,max-width,box-shadow] duration-200 ease-out select-none ${
            isScrolled
              ? 'w-full max-w-3xl lg:max-w-4xl h-[48px] px-3.5 sm:px-4 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.02)]'
              : 'w-full max-w-4xl lg:max-w-5xl h-[52px] sm:h-[54px] px-4 sm:px-5 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)]'
          }`}
          aria-label="Main Navigation"
        >
          {/* ========================================================================= */}
          {/* LEFT: [ PV ICON ]  PROJECT VERSE (Horizontally Aligned beside each other) */}
          {/* ========================================================================= */}
          <div className="flex items-center shrink-0 min-w-0">
            <button
              id="nav-logo-btn"
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2 sm:gap-2.5 py-1 px-1 rounded-xl hover:bg-black/[0.03] active:scale-[0.98] transition-all duration-180 focus:outline-none cursor-pointer shrink-0"
              aria-label="PROJECT VERSE Home"
              title="PROJECT VERSE"
            >
              {/* PV Compact Geometric Emblem (23px mobile / 25-26px desktop) */}
              <div className="shrink-0 flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-[1.03]">
                <div className="block sm:hidden">
                  <ProjectVerseLogo
                    size={23}
                    color="#111111"
                    className="shrink-0"
                  />
                </div>
                <div className="hidden sm:block">
                  <ProjectVerseLogo
                    size={isScrolled ? 24 : 26}
                    color="#111111"
                    className="shrink-0 transition-all duration-200"
                  />
                </div>
              </div>

              {/* PROJECT VERSE Wordmark (Two Separate Words in Instrument Serif) */}
              <div
                className="flex items-baseline whitespace-nowrap leading-none text-[#111111] transition-[opacity] duration-200 ease-out group-hover:opacity-90 font-brand-wordmark"
              >
                {/* PROJECT: slightly lighter, refined tracking */}
                <span className="text-[16px] sm:text-[17.5px] md:text-[18.5px] font-normal tracking-[0.025em] inline-block opacity-85">
                  PROJECT
                </span>

                {/* Calibrated single space between PROJECT and VERSE */}
                <span className="inline-block w-[0.28em]" aria-hidden="true" />

                {/* VERSE: slightly stronger visual presence, 100% opacity */}
                <span className="text-[17px] sm:text-[19px] md:text-[20px] font-medium tracking-[0.012em] inline-block opacity-100">
                  VERSE
                </span>
              </div>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* CENTER: Existing Desktop Nav Links [ Home, About, How It Works, FAQ ] */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-1 font-sans">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              onMouseEnter={() => prefetchView('home')}
              onFocus={() => prefetchView('home')}
              className={`text-[13.5px] leading-none px-3.5 py-1.5 rounded-xl cursor-pointer select-none transition-all duration-180 ${
                currentPage === 'home'
                  ? 'text-[#111111] bg-[#EBEBE8] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2]'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              onMouseEnter={() => prefetchView('about')}
              onFocus={() => prefetchView('about')}
              className={`text-[13.5px] leading-none px-3.5 py-1.5 rounded-xl cursor-pointer select-none transition-all duration-180 ${
                currentPage === 'about'
                  ? 'text-[#111111] bg-[#EBEBE8] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2]'
              }`}
            >
              About
            </button>

            <button
              id="nav-link-how-it-works"
              onClick={() => handleNavClick('how-it-works')}
              onMouseEnter={() => prefetchView('how-it-works')}
              onFocus={() => prefetchView('how-it-works')}
              className={`text-[13.5px] leading-none px-3.5 py-1.5 rounded-xl cursor-pointer select-none transition-all duration-180 ${
                currentPage === 'how-it-works'
                  ? 'text-[#111111] bg-[#EBEBE8] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2]'
              }`}
            >
              How It Works
            </button>

            <button
              id="nav-link-faq"
              onClick={() => handleNavClick('faq')}
              onMouseEnter={() => prefetchView('faq')}
              onFocus={() => prefetchView('faq')}
              className={`text-[13.5px] leading-none px-3.5 py-1.5 rounded-xl cursor-pointer select-none transition-all duration-180 ${
                currentPage === 'faq'
                  ? 'text-[#111111] bg-[#EBEBE8] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2]'
              }`}
            >
              FAQ
            </button>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: Actions [ Login, Get Started ] */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-2 font-sans">
            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              className="text-[13.5px] font-normal leading-none text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2] px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 transition-all duration-180 cursor-pointer select-none"
            >
              <AccountIcon size={15} className="text-[#4E4E4E]" />
              <span>Login</span>
            </button>

            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className="bg-[#111111] hover:bg-black text-white text-[13px] font-medium tracking-wide leading-none px-4 py-2 rounded-xl shadow-2xs hover:shadow-xs active:scale-95 transition-all duration-180 inline-flex items-center gap-1.5 cursor-pointer select-none font-sans"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/90" />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE TOP ACTIONS: [ Login, Get Started ] (320px - 768px) */}
          {/* ========================================================================= */}
          <div className="flex md:hidden items-center gap-1.5 font-sans shrink-0">
            <button
              id="nav-mobile-login-btn"
              onClick={onOpenLogin}
              className="text-[12px] sm:text-[12.5px] font-normal leading-none text-[#4E4E4E] hover:text-[#111111] px-2 sm:px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer select-none"
            >
              Login
            </button>
            <button
              id="nav-mobile-get-started-btn"
              onClick={onOpenRegister}
              className="bg-[#111111] hover:bg-black text-white text-[11.5px] sm:text-[12px] font-medium leading-none px-2.5 sm:px-3 py-1.5 rounded-xl shadow-2xs active:scale-95 transition-all cursor-pointer select-none font-sans"
            >
              Get Started
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ========================================================================= */}
      {/* ANIMATED MOBILE / TABLET BOTTOM NAVIGATION */}
      {/* Floating pill with active tab expanding animation (inspired by 21st.dev) */}
      {/* ========================================================================= */}
      <BottomNavBar
        currentPage={currentPage}
        onSelectPage={onSelectPage}
      />
    </>
  );
};

export default Navbar;
