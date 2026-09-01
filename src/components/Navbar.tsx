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
 * Communicates: Project, Connection, Continuity, Progress
 * Works independently as a favicon / brand mark.
 */
export const ProjectVerseLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    className={`${className} shrink-0 transition-transform duration-300 group-hover:scale-105`} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Geometric nexus perimeter: project space & continuity */}
    <path 
      d="M12 2.5L20.5 7.4V16.6L12 21.5L3.5 16.6V7.4L12 2.5Z" 
      stroke="currentColor" 
      strokeWidth="1.6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-indigo-400 dark:text-indigo-400 opacity-90"
    />
    {/* Progress axes connecting milestones */}
    <path 
      d="M12 2.5V12L20.5 16.6" 
      stroke="currentColor" 
      strokeWidth="1.4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-indigo-300/80 dark:text-indigo-300/80"
    />
    <path 
      d="M12 12L3.5 7.4" 
      stroke="currentColor" 
      strokeWidth="1.4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-indigo-300/80 dark:text-indigo-300/80"
    />
    {/* Central anchor node */}
    <circle cx="12" cy="12" r="1.8" fill="currentColor" className="text-indigo-400 dark:text-indigo-300" />
    {/* Vertex nodes representing project artifacts */}
    <circle cx="12" cy="2.5" r="1.1" fill="currentColor" className="text-white dark:text-white" />
    <circle cx="20.5" cy="7.4" r="1.1" fill="currentColor" className="text-indigo-400 dark:text-indigo-400" />
    <circle cx="20.5" cy="16.6" r="1.1" fill="currentColor" className="text-indigo-400 dark:text-indigo-400" />
    <circle cx="12" cy="21.5" r="1.1" fill="currentColor" className="text-white dark:text-white" />
    <circle cx="3.5" cy="16.6" r="1.1" fill="currentColor" className="text-indigo-400 dark:text-indigo-400" />
    <circle cx="3.5" cy="7.4" r="1.1" fill="currentColor" className="text-indigo-400 dark:text-indigo-400" />
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
      <header className="fixed top-3.5 sm:top-4.5 left-0 right-0 z-50 flex items-center justify-center px-3.5 sm:px-6 pointer-events-none transition-all duration-300">
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-3xl sm:max-w-[780px] flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'liquid-glass-nav shadow-xl backdrop-blur-2xl'
              : 'liquid-glass backdrop-blur-xl'
          }`}
          aria-label="Main Navigation"
        >
          {/* LEFT: ProjectVerse logo + PROJECTVERSE wordmark (Instrument Serif 24-28px, 400-500 weight, -0.04em tracking) */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer shrink-0 py-0.5 px-1 rounded-lg"
            aria-label="ProjectVerse Home"
          >
            <ProjectVerseLogo className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            <span className="font-display text-[24px] sm:text-[26px] font-normal tracking-[-0.04em] text-white leading-none select-none transition-opacity duration-200 group-hover:opacity-90">
              PROJECT<span className="text-indigo-400 dark:text-indigo-300 font-normal">VERSE</span>
            </span>
          </button>

          {/* CENTER: Home | About | How It Works (Inter sans-serif, 14-15px, medium weight, subtle pill on active) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`nav-link-item relative font-body text-[14px] sm:text-[14.5px] font-medium tracking-[-0.015em] px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-200 hover:-translate-y-[1px] hover:text-white ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-white/10 dark:bg-white/10 border border-white/12 rounded-full shadow-inner pointer-events-none"
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
              className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full liquid-glass-subtle flex items-center justify-center text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer focus:outline-none"
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
              className="font-body text-[14px] font-medium tracking-[-0.015em] text-slate-400 hover:text-white px-2.5 py-1 transition-colors duration-200 cursor-pointer hover:opacity-100"
            >
              Login
            </button>

            {/* Compact High-Contrast Get Started Pill Button (Light surface in Dark mode, Deep navy in Light mode) */}
            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium tracking-[-0.01em] bg-white dark:bg-white text-[#0A0F14] dark:text-[#0A0F14] px-4 py-1.5 rounded-full font-body shadow-sm hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
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
              className="w-7.5 h-7.5 rounded-full liquid-glass-subtle flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer focus:outline-none"
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
              className="w-7.5 h-7.5 rounded-full liquid-glass flex items-center justify-center text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE MENU: Floating Glass Panel Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0F14]/90 dark:bg-[#0A0F14]/90 backdrop-blur-2xl md:hidden flex flex-col justify-between p-5 pt-20"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ProjectVerseLogo className="w-5 h-5" />
                  <span className="font-display text-[22px] font-normal tracking-[-0.04em] text-white">
                    PROJECT<span className="text-indigo-400">VERSE</span>
                  </span>
                </div>
                <span className="text-[10.5px] font-mono-code text-slate-400 uppercase tracking-widest">
                  Menu
                </span>
              </div>

              {navItems.map((item, idx) => {
                const isActive = currentPage === item.page;
                return (
                  <motion.button
                    key={item.page}
                    id={`mobile-nav-link-${item.page}`}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between text-left py-3 px-4 rounded-xl text-[14.5px] font-medium tracking-[-0.015em] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-white border border-white/15 shadow-inner'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  </motion.button>
                );
              })}
            </div>

            <div className="pt-5 border-t border-white/10 flex flex-col gap-2.5">
              <button
                id="mobile-nav-login-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 px-4 rounded-xl liquid-glass text-slate-200 text-sm font-medium hover:text-white text-center cursor-pointer"
              >
                Login
              </button>
              <button
                id="mobile-nav-signup-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3 px-4 rounded-xl bg-white text-[#0A0F14] text-sm font-medium flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-transform cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
