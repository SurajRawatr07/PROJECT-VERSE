import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';
import { ProjectVerseBrand } from './ProjectVerseBrand';
import { AccountIcon } from './icons/AccountIcon';

export type PublicPage = 'home' | 'about' | 'how-it-works' | 'faq';

export { ProjectVerseLogo, ProjectVerseBrand };

interface NavbarProps {
  currentPage?: PublicPage;
  onSelectPage?: (page: PublicPage) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage: controlledPage,
  onSelectPage,
  onOpenLogin,
  onOpenRegister,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [activeSection, setActiveSection] = useState<PublicPage>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll position and direction with high-performance passive listener
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if past threshold
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check direction with 8px buffer
      if (Math.abs(currentScrollY - lastScrollY) > 8) {
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
        lastScrollY = currentScrollY;
      }

      // Track active section on the single-page layout
      const sections: PublicPage[] = ['faq', 'how-it-works', 'about', 'home'];
      const scrollPosition = currentScrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

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

  const scrollToSection = (sectionId: PublicPage) => {
    setMobileMenuOpen(false);
    if (onSelectPage) {
      onSelectPage(sectionId);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -72;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activePage = controlledPage || activeSection;
  const isCollapsed = isScrolled && scrollDirection === 'down';

  return (
    <>
      {/* 
        =========================================================================
        TOP FLOATING NAVBAR
        Centered horizontally, floating rounded pill inspired by Hacker Villa & minimal modern design
        Smooth collapse/shrink when scrolling down, expands when scrolling up
        =========================================================================
      */}
      <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex items-center justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <motion.nav
          id="main-navbar"
          layout
          initial={false}
          animate={{
            y: 0,
            scale: isCollapsed ? 0.96 : isScrolled ? 0.985 : 1,
            height: isCollapsed ? 44 : isScrolled ? 48 : 54,
            maxWidth: isCollapsed ? 760 : isScrolled ? 880 : 980,
          }}
          transition={{
            type: 'spring',
            stiffness: 340,
            damping: 28,
            mass: 0.8,
          }}
          className={`pointer-events-auto w-full rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] flex items-center justify-between select-none shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.02)] transition-colors duration-200 ${
            isCollapsed ? 'px-3 sm:px-4' : isScrolled ? 'px-3.5 sm:px-5' : 'px-4 sm:px-6'
          }`}
          aria-label="Main Navigation"
        >
          {/* ========================================================================= */}
          {/* LEFT: [ PV ICON ]  PROJECT VERSE (Two separate words in editorial typography) */}
          {/* ========================================================================= */}
          <div className="flex items-center shrink-0 min-w-0">
            <button
              id="nav-logo-btn"
              onClick={() => scrollToSection('home')}
              className="group flex items-center gap-2 sm:gap-2.5 py-1 px-1 rounded-full hover:bg-black/[0.03] active:scale-[0.98] transition-all duration-180 focus:outline-none cursor-pointer shrink-0"
              aria-label="PROJECT VERSE Home"
              title="PROJECT VERSE"
            >
              {/* PV Compact Geometric Mark */}
              <div className="shrink-0 flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-[1.04]">
                <ProjectVerseLogo
                  size={isCollapsed ? 22 : isScrolled ? 24 : 26}
                  color="#111111"
                  className="shrink-0 transition-all duration-200"
                />
              </div>

              {/* PROJECT VERSE Wordmark (Two Separate Words) */}
              <div className="flex items-baseline whitespace-nowrap leading-none text-[#111111] transition-opacity duration-200 ease-out group-hover:opacity-90 font-serif">
                <span className={`font-normal tracking-[0.03em] inline-block opacity-85 transition-all duration-200 ${
                  isCollapsed ? 'text-[15px]' : isScrolled ? 'text-[16px] sm:text-[17px]' : 'text-[16.5px] sm:text-[18px]'
                }`}>
                  PROJECT
                </span>
                <span className="inline-block w-[0.26em]" aria-hidden="true" />
                <span className={`font-medium tracking-[0.015em] inline-block opacity-100 transition-all duration-200 ${
                  isCollapsed ? 'text-[16px]' : isScrolled ? 'text-[17.5px] sm:text-[18.5px]' : 'text-[18px] sm:text-[20px]'
                }`}>
                  VERSE
                </span>
              </div>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* CENTER: Desktop Smooth-Scroll Nav Links [ Home, About, How It Works, FAQ ] */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-1 font-sans">
            <button
              id="nav-link-home"
              onClick={() => scrollToSection('home')}
              className={`text-[13px] leading-none px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-180 ${
                activePage === 'home'
                  ? 'text-[#111111] bg-[#EBEBE8] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2]'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-about"
              onClick={() => scrollToSection('about')}
              className={`text-[13px] leading-none px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-180 ${
                activePage === 'about'
                  ? 'text-[#111111] bg-[#EBEBE8] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2]'
              }`}
            >
              About
            </button>

            <button
              id="nav-link-how-it-works"
              onClick={() => scrollToSection('how-it-works')}
              className={`text-[13px] leading-none px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-180 ${
                activePage === 'how-it-works'
                  ? 'text-[#111111] bg-[#EBEBE8] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2]'
              }`}
            >
              How It Works
            </button>

            <button
              id="nav-link-faq"
              onClick={() => scrollToSection('faq')}
              className={`text-[13px] leading-none px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-180 ${
                activePage === 'faq'
                  ? 'text-[#111111] bg-[#EBEBE8] font-medium shadow-2xs'
                  : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2]'
              }`}
            >
              FAQ
            </button>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: Public Actions [ Login, Get Started ] */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-2 font-sans">
            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              className={`font-medium leading-none text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F4F4F2] rounded-full inline-flex items-center gap-1.5 transition-all duration-180 cursor-pointer select-none ${
                isCollapsed ? 'text-[12.5px] px-2.5 py-1.5' : 'text-[13px] px-3.5 py-1.5'
              }`}
            >
              <AccountIcon size={14} className="text-[#4E4E4E]" />
              <span>Login</span>
            </button>

            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className={`bg-[#111111] hover:bg-black text-white font-medium tracking-wide leading-none rounded-full shadow-2xs hover:shadow-xs active:scale-95 transition-all duration-180 inline-flex items-center gap-1.5 cursor-pointer select-none ${
                isCollapsed ? 'text-[12.5px] px-3.5 py-1.5' : 'text-[13px] px-4 py-2'
              }`}
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/90" />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE: Menu Trigger Button */}
          {/* ========================================================================= */}
          <div className="flex md:hidden items-center shrink-0 font-sans">
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3 py-1.5 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/[0.06] flex items-center gap-1.5 text-[#111111] focus:outline-none cursor-pointer text-xs font-medium transition-colors duration-150"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
              {mobileMenuOpen ? (
                <X className="w-3.5 h-3.5 text-[#111111]" />
              ) : (
                <Menu className="w-3.5 h-3.5 text-[#111111]" />
              )}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE NAVIGATION OVERLAY & FLOATING GLASS PANEL */}
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
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
              aria-hidden="true"
            />

            {/* Floating Navigation Card directly under the navbar */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 sm:top-20 inset-x-3 sm:inset-x-4 max-w-sm mx-auto z-50 bg-white/98 backdrop-blur-xl border border-black/[0.08] rounded-3xl p-4 sm:p-5 shadow-[0_16px_48px_rgba(0,0,0,0.12)] md:hidden flex flex-col font-sans"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <ProjectVerseLogo size={22} color="#111111" />
                  <div className="flex items-baseline leading-none text-[#111111] font-serif">
                    <span className="text-[16px] font-normal tracking-[0.025em] opacity-85">PROJECT</span>
                    <span className="inline-block w-[0.26em]" aria-hidden="true" />
                    <span className="text-[17px] font-medium tracking-[0.012em] opacity-100">VERSE</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Navigation Links: Home, About, How It Works, FAQ */}
              <div className="flex flex-col space-y-1 my-2">
                <button
                  id="mobile-nav-home"
                  onClick={() => scrollToSection('home')}
                  className={`flex items-center justify-between text-left min-h-[44px] py-2.5 px-3.5 rounded-2xl text-[14px] transition-all cursor-pointer ${
                    activePage === 'home'
                      ? 'bg-[#EBEBE8] text-[#111111] font-medium'
                      : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F7F7F5]'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888]" />
                </button>

                <button
                  id="mobile-nav-about"
                  onClick={() => scrollToSection('about')}
                  className={`flex items-center justify-between text-left min-h-[44px] py-2.5 px-3.5 rounded-2xl text-[14px] transition-all cursor-pointer ${
                    activePage === 'about'
                      ? 'bg-[#EBEBE8] text-[#111111] font-medium'
                      : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F7F7F5]'
                  }`}
                >
                  <span>About</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888]" />
                </button>

                <button
                  id="mobile-nav-how-it-works"
                  onClick={() => scrollToSection('how-it-works')}
                  className={`flex items-center justify-between text-left min-h-[44px] py-2.5 px-3.5 rounded-2xl text-[14px] transition-all cursor-pointer ${
                    activePage === 'how-it-works'
                      ? 'bg-[#EBEBE8] text-[#111111] font-medium'
                      : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F7F7F5]'
                  }`}
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888]" />
                </button>

                <button
                  id="mobile-nav-faq"
                  onClick={() => scrollToSection('faq')}
                  className={`flex items-center justify-between text-left min-h-[44px] py-2.5 px-3.5 rounded-2xl text-[14px] transition-all cursor-pointer ${
                    activePage === 'faq'
                      ? 'bg-[#EBEBE8] text-[#111111] font-medium'
                      : 'text-[#4E4E4E] hover:text-[#111111] hover:bg-[#F7F7F5]'
                  }`}
                >
                  <span>FAQ</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888]" />
                </button>
              </div>

              {/* Actions: Login & Get Started */}
              <div className="pt-3 border-t border-black/[0.06] flex flex-col gap-2">
                <button
                  id="mobile-nav-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full min-h-[44px] py-2.5 px-3 rounded-full bg-[#F7F7F5] hover:bg-[#ECECE8] border border-black/[0.06] text-[#111111] text-[13.5px] font-medium text-center inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <AccountIcon size={15} className="text-[#111111]" />
                  <span>Login</span>
                </button>
                <button
                  id="mobile-nav-signup-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full min-h-[44px] py-2.5 px-3 rounded-full bg-[#111111] hover:bg-black text-white text-[13.5px] font-medium flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
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
