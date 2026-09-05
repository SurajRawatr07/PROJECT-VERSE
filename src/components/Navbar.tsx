import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';
import { ProjectVerseBrand } from './ProjectVerseBrand';
import { AccountIcon } from './icons/AccountIcon';
import { ThemeSwitch } from './common/ThemeSwitch';
import { prefetchView } from '../lib/prefetchService';

export type PublicPage = 'home' | 'about' | 'how-it-works' | 'faq';

// Re-export ProjectVerseLogo & ProjectVerseBrand for seamless application-wide access
export { ProjectVerseLogo, ProjectVerseBrand };

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Prevent background scrolling while mobile navigation panel is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (page: PublicPage) => {
    onSelectPage(page);
    setMobileMenuOpen(false);
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
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex items-center justify-center px-3 sm:px-4 pointer-events-none">
        <motion.nav
          id="main-navbar"
          layout
          transition={{
            layout: { type: 'spring', stiffness: 440, damping: 35 },
          }}
          className={`pointer-events-auto rounded-full bg-white/95 dark:bg-[#15151A]/92 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] flex items-center justify-between transition-[padding,height,max-width,box-shadow,background-color,border-color] duration-220 ease-out select-none ${
            isScrolled
              ? 'w-full max-w-3xl lg:max-w-4xl h-[48px] px-3 sm:px-4 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
              : 'w-full max-w-4xl lg:max-w-5xl h-[52px] sm:h-[56px] px-3.5 sm:px-5 shadow-[0_2px_12px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
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
              className="group flex items-center gap-2 sm:gap-2.5 py-1 px-1 rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-180 focus:outline-none cursor-pointer shrink-0"
              aria-label="PROJECT VERSE Home"
              title="PROJECT VERSE"
            >
              {/* PV Compact Geometric Emblem (26px mobile / 28-30px desktop) */}
              <div className="shrink-0 flex items-center justify-center transition-transform duration-220 ease-out group-hover:scale-[1.03]">
                <div className="block sm:hidden">
                  <ProjectVerseLogo
                    size={26}
                    color="#111111"
                    className="shrink-0"
                  />
                </div>
                <div className="hidden sm:block">
                  <ProjectVerseLogo
                    size={isScrolled ? 28 : 30}
                    color="#111111"
                    className="shrink-0 transition-all duration-200"
                  />
                </div>
              </div>

              {/* PROJECT VERSE Wordmark (Two Separate Words in Instrument Serif) */}
              <div
                className="flex items-baseline whitespace-nowrap leading-none font-brand text-[#111111] dark:text-[#F4F4F6] transition-[opacity,letter-spacing] duration-220 ease-out group-hover:opacity-90"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {/* PROJECT: slightly lighter, refined tracking */}
                <span className="text-[17.5px] sm:text-[19px] md:text-[20.5px] font-normal tracking-[0.025em] inline-block opacity-90">
                  PROJECT
                </span>

                {/* Calibrated single space between PROJECT and VERSE */}
                <span className="inline-block w-[0.32em]" aria-hidden="true" />

                {/* VERSE: slightly stronger visual presence, 100% opacity */}
                <span className="text-[19px] sm:text-[20.5px] md:text-[22px] font-medium tracking-[0.012em] inline-block opacity-100">
                  VERSE
                </span>
              </div>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* CENTER: Existing Desktop Nav Links [ Home, About, How It Works, FAQ ] */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-1 font-nav">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              onMouseEnter={() => prefetchView('home')}
              onFocus={() => prefetchView('home')}
              className={`text-[13.5px] lg:text-[14px] leading-none px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-180 ${
                currentPage === 'home'
                  ? 'text-[#111111] dark:text-[#FFFFFF] bg-[#EBEBE8] dark:bg-[#26262D] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#F4F4F2] dark:hover:bg-[#202026]'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              onMouseEnter={() => prefetchView('about')}
              onFocus={() => prefetchView('about')}
              className={`text-[13.5px] lg:text-[14px] leading-none px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-180 ${
                currentPage === 'about'
                  ? 'text-[#111111] dark:text-[#FFFFFF] bg-[#EBEBE8] dark:bg-[#26262D] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#F4F4F2] dark:hover:bg-[#202026]'
              }`}
            >
              About
            </button>

            <button
              id="nav-link-how-it-works"
              onClick={() => handleNavClick('how-it-works')}
              onMouseEnter={() => prefetchView('how-it-works')}
              onFocus={() => prefetchView('how-it-works')}
              className={`text-[13.5px] lg:text-[14px] leading-none px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-180 ${
                currentPage === 'how-it-works'
                  ? 'text-[#111111] dark:text-[#FFFFFF] bg-[#EBEBE8] dark:bg-[#26262D] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#F4F4F2] dark:hover:bg-[#202026]'
              }`}
            >
              How It Works
            </button>

            <button
              id="nav-link-faq"
              onClick={() => handleNavClick('faq')}
              onMouseEnter={() => prefetchView('faq')}
              onFocus={() => prefetchView('faq')}
              className={`text-[13.5px] lg:text-[14px] leading-none px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-180 ${
                currentPage === 'faq'
                  ? 'text-[#111111] dark:text-[#FFFFFF] bg-[#EBEBE8] dark:bg-[#26262D] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#F4F4F2] dark:hover:bg-[#202026]'
              }`}
            >
              FAQ
            </button>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: Actions [ Theme Switch, Login, Get Started ] */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-2 font-nav">
            <div className="flex items-center mr-1">
              <ThemeSwitch id="desktop-theme-switch" />
            </div>

            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              className="text-[13.5px] lg:text-[14px] font-normal leading-none text-[#4E4E4E] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#F4F4F2] dark:hover:bg-[#202026] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-all duration-180 cursor-pointer select-none"
            >
              <AccountIcon size={15} className="text-[#4E4E4E] dark:text-[#A1A1AA]" />
              <span>Login</span>
            </button>

            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className="bg-[#111111] hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-[#0E0E10] text-[13px] lg:text-[13.5px] font-medium tracking-wide leading-none px-4 py-1.5 rounded-full shadow-xs hover:shadow-sm active:scale-95 transition-all duration-180 inline-flex items-center gap-1.5 cursor-pointer select-none font-nav"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/90 dark:text-[#0E0E10]" />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE: [ MENU ] Pill Button (Compact, minimal, responsive 320px-768px) */}
          {/* ========================================================================= */}
          <div className="flex md:hidden items-center shrink-0 font-nav">
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-2.5 py-1 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] dark:bg-[#202026] dark:hover:bg-[#26262D] border border-black/[0.06] dark:border-white/[0.10] flex items-center gap-1 text-[#111111] dark:text-[#F4F4F6] focus:outline-none cursor-pointer text-xs font-nav font-medium transition-colors duration-150"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
              {mobileMenuOpen ? (
                <X className="w-3.5 h-3.5 text-[#111111] dark:text-[#F4F4F6]" />
              ) : (
                <Menu className="w-3.5 h-3.5 text-[#111111] dark:text-[#F4F4F6]" />
              )}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE NAVIGATION OVERLAY & FLOATING PANEL */}
      {/* Preserves identical links & actions, smooth animation, zero overflow */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Soft Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-xs md:hidden"
              aria-hidden="true"
            />

            {/* Floating Navigation Card directly under the navbar */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 inset-x-3 sm:inset-x-4 max-w-sm mx-auto z-50 bg-white/98 dark:bg-[#16161B]/98 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] md:hidden flex flex-col font-nav"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <ProjectVerseLogo size={26} color="#111111" />
                  <div
                    className="flex items-baseline leading-none font-brand text-[#111111] dark:text-[#F4F4F6]"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    <span className="text-[17.5px] font-normal tracking-[0.025em] opacity-90">PROJECT</span>
                    <span className="inline-block w-[0.3em]" aria-hidden="true" />
                    <span className="text-[19px] font-medium tracking-[0.012em] opacity-100">VERSE</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] dark:bg-[#202026] dark:hover:bg-[#26262D] flex items-center justify-center text-[#111111] dark:text-[#F4F4F6] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Navigation Links: Home, About, How It Works, FAQ */}
              <div className="flex flex-col space-y-1 my-1">
                <button
                  id="mobile-nav-home"
                  onClick={() => handleNavClick('home')}
                  className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-[14px] transition-all cursor-pointer ${
                    currentPage === 'home'
                      ? 'bg-[#EBEBE8] dark:bg-[#26262D] text-[#111111] dark:text-[#FFFFFF] font-medium'
                      : 'text-[#4E4E4E] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#F7F7F5] dark:hover:bg-[#202026]'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888] dark:text-[#71717A]" />
                </button>

                <button
                  id="mobile-nav-about"
                  onClick={() => handleNavClick('about')}
                  className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-[14px] transition-all cursor-pointer ${
                    currentPage === 'about'
                      ? 'bg-[#EBEBE8] dark:bg-[#26262D] text-[#111111] dark:text-[#FFFFFF] font-medium'
                      : 'text-[#4E4E4E] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#F7F7F5] dark:hover:bg-[#202026]'
                  }`}
                >
                  <span>About</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888] dark:text-[#71717A]" />
                </button>

                <button
                  id="mobile-nav-how-it-works"
                  onClick={() => handleNavClick('how-it-works')}
                  className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-[14px] transition-all cursor-pointer ${
                    currentPage === 'how-it-works'
                      ? 'bg-[#EBEBE8] dark:bg-[#26262D] text-[#111111] dark:text-[#FFFFFF] font-medium'
                      : 'text-[#4E4E4E] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#F7F7F5] dark:hover:bg-[#202026]'
                  }`}
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888] dark:text-[#71717A]" />
                </button>

                <button
                  id="mobile-nav-faq"
                  onClick={() => handleNavClick('faq')}
                  className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-[14px] transition-all cursor-pointer ${
                    currentPage === 'faq'
                      ? 'bg-[#EBEBE8] dark:bg-[#26262D] text-[#111111] dark:text-[#FFFFFF] font-medium'
                      : 'text-[#4E4E4E] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#F7F7F5] dark:hover:bg-[#202026]'
                  }`}
                >
                  <span>FAQ</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888] dark:text-[#71717A]" />
                </button>
              </div>

              {/* Mobile Theme Switch Row: Theme [Switch] */}
              <div className="my-2 py-2 px-3 rounded-xl bg-[#F7F7F5] dark:bg-[#202026] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <span className="text-[13.5px] font-medium text-[#111111] dark:text-[#F4F4F6]">
                  Theme
                </span>
                <ThemeSwitch id="mobile-nav-theme-switch" />
              </div>

              {/* Actions: Login & Get Started */}
              <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-2">
                <button
                  id="mobile-nav-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#F7F7F5] hover:bg-[#ECECE8] dark:bg-[#202026] dark:hover:bg-[#26262D] border border-black/[0.06] dark:border-white/[0.08] text-[#111111] dark:text-[#F4F4F6] text-[13.5px] font-medium text-center inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <AccountIcon size={16} className="text-[#111111] dark:text-[#F4F4F6]" />
                  <span>Login</span>
                </button>
                <button
                  id="mobile-nav-signup-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#111111] hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-[#0E0E10] text-[13.5px] font-medium flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white dark:text-[#0E0E10]" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
