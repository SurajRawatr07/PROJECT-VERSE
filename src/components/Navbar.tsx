import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type PublicPage = 'home' | 'about' | 'how-it-works';

interface NavbarProps {
  currentPage: PublicPage;
  onSelectPage: (page: PublicPage) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

/**
 * Minimal Geometric ProjectVerse Symbol
 * Concept: Projects + Connection + Contribution + Continuity
 * (PROJECT -> COLLABORATION -> VERIFICATION -> CONTINUATION)
 * Continuous geometric path and milestone nodes forming a clean, abstract P + V lineage.
 */
export const ProjectVerseLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    className={`${className} shrink-0 select-none transition-transform duration-300 group-hover:scale-105`} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Base vertical spine / Academic Foundation */}
    <path 
      d="M5 19V5" 
      stroke="currentColor" 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="opacity-75 dark:opacity-85"
    />
    
    {/* 'P' Milestone Loop: Genesis & Contribution */}
    <path 
      d="M5 5.5H11.5C13.433 5.5 15 7.067 15 9C15 10.933 13.433 12.5 11.5 12.5H5" 
      stroke="currentColor" 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* 'V' Trajectory & Forward Continuation Lineage */}
    <path 
      d="M5 12.5L12 19L19.5 5.5" 
      stroke="currentColor" 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-indigo-500 dark:text-indigo-400"
    />
    
    {/* Connected Milestone Nodes */}
    <circle cx="5" cy="5.5" r="1.4" fill="currentColor" />
    <circle cx="15" cy="9" r="1.4" fill="currentColor" className="text-indigo-500 dark:text-indigo-400" />
    <circle cx="12" cy="19" r="1.4" fill="currentColor" />
    <circle cx="19.5" cy="5.5" r="1.5" fill="currentColor" className="text-indigo-500 dark:text-indigo-400" />
    <circle cx="5" cy="19" r="1.2" fill="currentColor" className="opacity-75" />
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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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

  const themeToggleLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <>
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex items-center justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <motion.nav
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-3xl sm:max-w-[760px] flex items-center justify-between px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'liquid-glass-nav shadow-lg backdrop-blur-2xl'
              : 'liquid-glass backdrop-blur-xl'
          }`}
          aria-label="Main Navigation"
        >
          {/* LEFT: ProjectVerse Symbol + Wordmark (Desktop: 22–24px, Mobile: 19–21px, 400 weight, -0.035em tracking) */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0 py-0.5 px-1 rounded-lg"
            aria-label="ProjectVerse"
          >
            <ProjectVerseLogo className="w-5 h-5 sm:w-[21px] sm:h-[21px] text-indigo-500 dark:text-indigo-400" />
            <span className="font-display text-[20px] sm:text-[22px] md:text-[23px] font-normal tracking-[-0.035em] text-[#111111] dark:text-[#F5F5F5] leading-none whitespace-nowrap select-none transition-opacity duration-200 group-hover:opacity-90">
              PROJECT<span className="inline-block w-[0.22em]" aria-hidden="true" />VERSE
            </span>
          </button>

          {/* CENTER: Home | About | How It Works (Inter 14px, 500 weight, -0.015em tracking) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`nav-link-item relative font-body text-[14px] font-medium tracking-[-0.015em] leading-none px-3.5 py-2 rounded-full cursor-pointer select-none transition-all duration-200 hover:-translate-y-[1px] ${
                    isActive
                      ? 'text-[#111111] dark:text-[#F5F5F5] font-semibold'
                      : 'text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-black/6 dark:bg-white/10 border border-black/8 dark:border-white/10 rounded-full pointer-events-none"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Theme Toggle | Login | Get Started */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            {/* Minimal Round Glass Theme Toggle Control */}
            <button
              id="nav-theme-toggle-btn"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full liquid-glass-subtle flex items-center justify-center text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#F5F5F5] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 cursor-pointer focus:outline-none"
              aria-label={themeToggleLabel}
              title={themeToggleLabel}
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-indigo-300 hover:text-indigo-200 transition-colors" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500 hover:text-amber-600 transition-colors" />
              )}
            </button>

            {/* Minimal Clean Typography Login Button */}
            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              className="font-body text-[14px] font-medium tracking-[-0.015em] leading-none text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#F5F5F5] px-2.5 py-1.5 transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>

            {/* Compact High-Contrast Get Started Pill Button (scale 1.015 on hover) */}
            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium tracking-[-0.01em] leading-none bg-[#111111] text-white dark:bg-[#F5F5F5] dark:text-[#090A0C] px-3.5 py-2 rounded-full font-body shadow-sm hover:opacity-95 hover:scale-[1.015] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3 text-current" />
            </button>
          </div>

          {/* MOBILE CONTROLS: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Mobile Theme Toggle */}
            <button
              id="mobile-nav-theme-toggle-btn"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full liquid-glass-subtle flex items-center justify-center text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white transition-all cursor-pointer focus:outline-none"
              aria-label={themeToggleLabel}
              title={themeToggleLabel}
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-indigo-300" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white focus:outline-none cursor-pointer"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE MENU: Full-width Floating Glass Panel Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#F7F7F5]/95 dark:bg-[#090A0C]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-20"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <ProjectVerseLogo className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  <span className="font-display text-[20px] font-normal tracking-[-0.035em] text-[#111111] dark:text-[#F5F5F5]">
                    PROJECT<span className="inline-block w-[0.22em]" aria-hidden="true" />VERSE
                  </span>
                </div>
                <span className="text-[11px] font-mono-code text-[#666666] dark:text-[#71717A] uppercase tracking-widest">
                  Menu
                </span>
              </div>

              {navItems.map((item, idx) => {
                const isActive = currentPage === item.page;
                return (
                  <motion.button
                    key={item.page}
                    id={`mobile-nav-link-${item.page}`}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between text-left py-3.5 px-4 rounded-xl text-[18px] font-medium tracking-[-0.015em] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-black/6 dark:bg-white/10 text-[#111111] dark:text-white border border-black/10 dark:border-white/15'
                        : 'text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </motion.button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
              <button
                id="mobile-nav-login-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-3 px-4 rounded-xl liquid-glass text-[#111111] dark:text-slate-200 text-[15px] font-medium hover:opacity-90 text-center cursor-pointer"
              >
                Login
              </button>
              <button
                id="mobile-nav-signup-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#111111] text-white dark:bg-[#F5F5F5] dark:text-[#090A0C] text-[15px] font-medium flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
