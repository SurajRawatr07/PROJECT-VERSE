import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

export type PublicPage = 'home' | 'about' | 'how-it-works';

interface NavbarProps {
  currentPage: PublicPage;
  onSelectPage: (page: PublicPage) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

/**
 * Custom Minimal ProjectVerse Geometric Logo
 * Represents: PROJECT -> CONTRIBUTION -> VERIFICATION -> CONTINUATION
 * Geometric vector emblem combining P + V with connected milestone nodes and continuous lineage paths.
 * Color: #111111. Fully vector scalable from 16px to 32px+.
 */
export const ProjectVerseLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    className={`${className} shrink-0 select-none transition-transform duration-200 group-hover:scale-105`} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Base vertical academic project spine (y: 5 -> 19) */}
    <path 
      d="M5 19V5" 
      stroke="#111111" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* 'P' Milestone Loop: Project Genesis & Collaborative Contribution */}
    <path 
      d="M5 5.5H12C14.209 5.5 16 7.291 16 9.5C16 11.709 14.209 13.5 12 13.5H5" 
      stroke="#111111" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* 'V' Trajectory & Forward Lineage Path: Verification to Continuation */}
    <path 
      d="M5 13.5L12 19L19.5 5.5" 
      stroke="#111111" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Connected Milestone Nodes: Project (top-left), Contribution (P-peak), Verification (V-vertex), Continuation (V-end) */}
    <circle cx="5" cy="5.5" r="1.4" fill="#111111" />
    <circle cx="16" cy="9.5" r="1.4" fill="#111111" />
    <circle cx="12" cy="19" r="1.4" fill="#111111" />
    <circle cx="19.5" cy="5.5" r="1.5" fill="#111111" />
    <circle cx="5" cy="19" r="1.3" fill="#111111" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  onOpenLogin,
  onOpenRegister
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex items-center justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <motion.nav
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-4xl sm:max-w-4xl lg:max-w-5xl flex items-center justify-between px-3 sm:px-4 py-2 rounded-full floating-navbar transition-all duration-300 ${
            isScrolled ? 'shadow-md bg-white/95' : 'shadow-sm bg-white/88'
          }`}
          aria-label="Main Navigation"
        >
          {/* LEFT: ProjectVerse Custom SVG Logo + Wordmark */}
          {/* Sizes: Desktop 22–25px, Tablet 21–23px, Mobile 19–21px. Font weight 400, letter-spacing -0.035em, line-height 1 */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0 py-0.5 px-1 rounded-lg"
            aria-label="PROJECTVERSE"
          >
            <ProjectVerseLogo className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#111111]" />
            <span className="font-display text-[20px] sm:text-[22px] md:text-[24px] font-normal tracking-[-0.035em] text-[#111111] leading-none whitespace-nowrap select-none transition-opacity duration-200 group-hover:opacity-85">
              PROJECT<span className="inline-block w-[0.24em]" aria-hidden="true" />VERSE
            </span>
          </button>

          {/* CENTER: Navigation Links (Inter, 14px, font-weight 500, letter-spacing -0.015em) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`relative font-body text-[14px] font-medium tracking-[-0.015em] leading-none px-3.5 py-2 rounded-full cursor-pointer select-none transition-all duration-200 hover:-translate-y-[1px] ${
                    isActive
                      ? 'text-[#111111] bg-[#F3F3F1] font-semibold'
                      : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Login + Primary Get Started CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Secondary Clean Typography Login Button */}
            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              className="font-body text-[14px] font-medium tracking-[-0.015em] leading-none text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1] px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer"
            >
              Login
            </button>

            {/* Primary Get Started CTA (black background, white text, rounded-full, 10px 18px, 13.5px font, hover scale 1.02) */}
            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className="btn-primary-black inline-flex items-center gap-1.5 px-4.5 py-2.5 cursor-pointer select-none"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* MOBILE TOGGLE (Hidden on Desktop) */}
          <div className="flex md:hidden items-center">
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full bg-[#F5F5F3] border border-black/8 flex items-center justify-center text-[#111111] hover:bg-[#ECECE9] focus:outline-none cursor-pointer"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE MENU: Full-width Floating White Glass Panel Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-20"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-black/8">
                <div className="flex items-center gap-2">
                  <ProjectVerseLogo className="w-5 h-5 text-[#111111]" />
                  <span className="font-display text-[20px] font-normal tracking-[-0.035em] text-[#111111] whitespace-nowrap">
                    PROJECT<span className="inline-block w-[0.24em]" aria-hidden="true" />VERSE
                  </span>
                </div>
                <span className="text-[11px] font-mono-code text-[#737373] uppercase tracking-widest">
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
                    className={`flex items-center justify-between text-left py-3.5 px-4 rounded-xl text-[17px] font-medium tracking-[-0.015em] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#F3F3F1] text-[#111111] font-semibold border border-black/8'
                        : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F7F7F5] border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[#111111]' : 'text-slate-400'}`} />
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
                className="w-full py-3 px-4 rounded-xl bg-[#F7F7F5] border border-black/8 text-[#111111] text-[15px] font-medium hover:bg-[#ECECE9] text-center cursor-pointer"
              >
                Login
              </button>
              <button
                id="mobile-nav-signup-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#111111] text-white text-[15px] font-medium flex items-center justify-center gap-2 shadow-md hover:bg-[#262626] active:scale-[0.98] transition-all cursor-pointer"
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
