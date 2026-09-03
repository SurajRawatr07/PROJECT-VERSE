import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';
import { ProjectVerseBrand } from './ProjectVerseBrand';
import { AccountIcon } from './icons/AccountIcon';

export type PublicPage = 'home' | 'about' | 'how-it-works';

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
  onOpenRegister
}) => {
  const [isCompact, setIsCompact] = useState(false);
  const [isModerateScroll, setIsModerateScroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollUpAccumulator = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // 1. Moderate scroll detection (subtle height & padding reduction)
      if (currentScrollY > 40) {
        setIsModerateScroll(true);
      } else {
        setIsModerateScroll(false);
      }

      // 2. Compact mode detection (anchored in place, zero downward translation)
      if (currentScrollY <= 80) {
        // At or near top -> always expand full navbar
        setIsCompact(false);
        scrollUpAccumulator.current = 0;
      } else if (delta > 3 && currentScrollY > 150) {
        // Scrolling down past threshold -> compact in place
        setIsCompact(true);
        scrollUpAccumulator.current = 0;
      } else if (delta < -3) {
        // Scrolling up -> accumulate upward scroll distance to smoothly expand
        scrollUpAccumulator.current += Math.abs(delta);
        if (scrollUpAccumulator.current > 50) {
          setIsCompact(false);
          scrollUpAccumulator.current = 0;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PublicPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'How It Works', page: 'how-it-works' },
  ];

  const handleNavClick = (page: PublicPage) => {
    onSelectPage(page);
    setMobileMenuOpen(false);
    setIsCompact(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleExpand = () => {
    if (isCompact) {
      setIsCompact(false);
    }
  };

  return (
    <>
      {/* 
        Fixed Top Anchor: Anchored strictly at top-4 sm:top-5 with ZERO vertical translation.
        The navbar and logo stay at the same top anchor point throughout all scroll states.
      */}
      <header className="fixed top-3.5 sm:top-4 md:top-5 left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <motion.nav
          id="main-navbar"
          layout
          onClick={handleToggleExpand}
          transition={{
            layout: { type: 'spring', stiffness: 380, damping: 32 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.25 }
          }}
          className={`pointer-events-auto rounded-full bg-white/94 backdrop-blur-[20px] border border-black/8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex items-center transition-[background-color,border-color,box-shadow] duration-200 ${
            isCompact
              ? 'md:w-[52px] md:h-[50px] md:p-0 md:justify-center w-full max-w-4xl h-[52px] px-3.5 justify-between cursor-pointer hover:border-black/15 hover:shadow-[0_12px_36px_rgba(0,0,0,0.10)]'
              : isModerateScroll
              ? 'w-full max-w-4xl lg:max-w-5xl h-[52px] sm:h-[54px] px-3.5 sm:px-4.5 justify-between'
              : 'w-full max-w-4xl lg:max-w-5xl h-[54px] sm:h-[56px] px-4 sm:px-5 justify-between'
          }`}
          aria-label="Main Navigation"
        >
          {/* ========================================================================= */}
          {/* LEFT: [ SYMBOL ] PROJECT VERSE (Wordmark fades smoothly in compact mode) */}
          {/* ========================================================================= */}
          <div className="flex items-center shrink-0">
            <button
              id="nav-logo-btn"
              onClick={(e) => {
                if (isCompact) {
                  e.stopPropagation();
                  setIsCompact(false);
                } else {
                  handleNavClick('home');
                }
              }}
              className={`flex items-center text-left focus:outline-none group cursor-pointer shrink-0 py-1 px-1 rounded-full transition-transform duration-200 ${
                isCompact ? 'justify-center mx-auto' : ''
              }`}
              aria-label="ProjectVerse Home"
              title={isCompact ? 'Click to expand menu' : 'ProjectVerse Home'}
            >
              {/* Distinctive Geometric Symbol (Never moves downward, centered in compact pill) */}
              <div className="shrink-0 flex items-center justify-center">
                <ProjectVerseLogo
                  size={isCompact ? 27 : 28}
                  color="#0F172A"
                  accentColor="#2563EB"
                  className="transition-transform duration-200 group-hover:scale-105"
                />
              </div>

              {/* PROJECT VERSE Wordmark (Smoothly collapsed on desktop in compact mode) */}
              <motion.div
                animate={{
                  opacity: isCompact ? 0 : 1,
                  width: isCompact ? 0 : 'auto',
                  marginLeft: isCompact ? 0 : 11
                }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={`overflow-hidden whitespace-nowrap flex items-baseline leading-none font-brand font-normal text-[#0F172A] text-[19px] sm:text-[21.5px] md:text-[23px] select-none ${
                  isCompact ? 'md:hidden' : 'inline-flex'
                }`}
                style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' }}
              >
                <span className="text-[0.90em] tracking-[0.03em] inline-block font-normal">
                  PROJECT
                </span>
                <span className="inline-block w-[0.32em]" aria-hidden="true" />
                <span className="text-[1.04em] tracking-[-0.012em] inline-block font-normal">
                  VERSE
                </span>
              </motion.div>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* CENTER: Navigation Links (Home, About, How It Works) */}
          {/* ========================================================================= */}
          <motion.div
            animate={{
              opacity: isCompact ? 0 : 1,
              scale: isCompact ? 0.95 : 1
            }}
            transition={{ duration: 0.2 }}
            className={`items-center gap-1 ${
              isCompact ? 'hidden' : 'hidden md:flex'
            }`}
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavClick(item.page);
                  }}
                  className={`relative font-body text-[14px] font-semibold tracking-[-0.015em] leading-none px-4 py-2 rounded-full cursor-pointer select-none transition-all duration-200 hover:-translate-y-[1px] ${
                    isActive
                      ? 'text-[#111111] bg-[#EBEBE7] font-bold shadow-xs'
                      : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT: Login + Primary Get Started CTA */}
          {/* ========================================================================= */}
          <motion.div
            animate={{
              opacity: isCompact ? 0 : 1,
              scale: isCompact ? 0.95 : 1
            }}
            transition={{ duration: 0.2 }}
            className={`items-center gap-2 ${
              isCompact ? 'hidden' : 'hidden md:flex'
            }`}
          >
            {/* Secondary AccountIcon Login Button */}
            <button
              id="nav-login-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLogin();
              }}
              className="font-body text-[14px] font-semibold tracking-[-0.015em] leading-none text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1] px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none hover:-translate-y-[1px]"
            >
              <AccountIcon size={18} className="text-[#4A4A4A] group-hover:text-[#111111]" />
              <span>Login</span>
            </button>

            {/* Primary Get Started CTA Button */}
            <button
              id="nav-get-started-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenRegister();
              }}
              className="btn-primary-black inline-flex items-center gap-1.5 px-4.5 py-2.5 cursor-pointer select-none font-semibold text-[13.5px]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </motion.div>

          {/* ========================================================================= */}
          {/* MOBILE: Menu Toggle Button (Keeps accessible on mobile devices) */}
          {/* ========================================================================= */}
          <div className="flex md:hidden items-center shrink-0">
            <button
              id="nav-mobile-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="w-8 h-8 rounded-full bg-[#F5F5F3] border border-black/8 flex items-center justify-center text-[#111111] hover:bg-[#ECECE9] focus:outline-none cursor-pointer"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER / OVERLAY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-24"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-black/8">
                <ProjectVerseBrand
                  theme="light"
                  interactive={false}
                  textSizeClassName="text-[20px]"
                />
                <span className="text-[11px] font-mono-code text-[#737373] uppercase tracking-widest font-medium">
                  Menu
                </span>
              </div>

              {navItems.map((item, idx) => {
                const isActive = currentPage === item.page;
                return (
                  <motion.button
                    key={item.page}
                    id={`mobile-nav-link-${item.page}`}
                    initial={{ x: -8, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between text-left py-3.5 px-4 rounded-xl text-[16px] font-semibold tracking-[-0.015em] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#EBEBE7] text-[#111111] font-bold border border-black/8'
                        : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F7F7F5] border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[#111111]' : 'text-[#737373]'}`} />
                  </motion.button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-black/8 flex flex-col gap-3">
              <button
                id="mobile-nav-login-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#F7F7F5] border border-black/8 text-[#111111] text-[15px] font-semibold hover:bg-[#ECECE9] text-center inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <AccountIcon size={18} className="text-[#111111]" />
                <span>Login</span>
              </button>
              <button
                id="mobile-nav-signup-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#111111] text-white text-[15px] font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-[#262626] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
