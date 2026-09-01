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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-3.5 sm:px-6 py-3 sm:py-4 pointer-events-none transition-all duration-300">
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'liquid-glass-nav shadow-2xl backdrop-blur-2xl'
              : 'liquid-glass backdrop-blur-xl'
          }`}
          aria-label="Main Navigation"
        >
          {/* Left: Refined Typographic Wordmark in Instrument Serif */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none group cursor-pointer shrink-0 py-0.5"
            aria-label="ProjectVerse Home"
          >
            <span className="font-display text-[24px] sm:text-[26px] font-normal tracking-[-0.04em] text-white leading-none select-none transition-opacity duration-200 group-hover:opacity-90">
              PROJECT<span className="text-indigo-400 dark:text-indigo-300 font-normal">VERSE</span>
            </span>
          </button>

          {/* Center: Home | About | How It Works */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`nav-link-item relative font-body text-[14px] font-medium tracking-[-0.01em] px-4 py-1.5 rounded-full cursor-pointer select-none ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 bg-white/10 dark:bg-white/10 border border-white/15 rounded-full shadow-inner pointer-events-none"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Tools: [Theme Toggle] | Login | Get Started */}
          <div className="hidden md:flex items-center gap-2.5 sm:gap-3">
            {/* Compact Glass Theme Toggle Pill */}
            <button
              id="nav-theme-toggle-btn"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full liquid-glass-subtle flex items-center justify-center text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200 cursor-pointer focus:outline-none"
              aria-label={themeToggleLabel}
              title={themeToggleLabel}
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-indigo-300 hover:text-indigo-200 transition-colors" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500 hover:text-amber-600 transition-colors" />
              )}
            </button>

            {/* Minimal Clean Typography Login */}
            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              className="font-body text-[14px] font-medium tracking-[-0.01em] text-slate-300 hover:text-white px-3 py-1.5 transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>

            {/* Strongest Navbar Element: Get Started Rounded Pill */}
            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium tracking-[-0.01em] bg-white text-[#0A0F14] px-4 py-1.5 rounded-full font-body shadow-md shadow-white/10 hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme toggle directly accessible on mobile */}
            <button
              id="mobile-nav-theme-toggle-btn"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full liquid-glass-subtle flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer focus:outline-none"
              aria-label={themeToggleLabel}
              title={themeToggleLabel}
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-indigo-300" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
            </button>

            {/* Hamburger Toggle */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-slate-200 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu: Premium Fullscreen Glass Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0F14]/95 dark:bg-[#0A0F14]/95 backdrop-blur-3xl md:hidden flex flex-col justify-between p-6 pt-24"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-white/10">
                <span className="font-display text-[26px] font-normal tracking-[-0.04em] text-white">
                  PROJECT<span className="text-indigo-400">VERSE</span>
                </span>
                <span className="text-[11px] font-mono-code text-slate-400 uppercase tracking-widest">
                  Navigation
                </span>
              </div>

              {navItems.map((item, idx) => {
                const isActive = currentPage === item.page;
                return (
                  <motion.button
                    key={item.page}
                    id={`mobile-nav-link-${item.page}`}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between text-left py-3.5 px-4 rounded-2xl text-[15px] font-medium tracking-[-0.01em] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-white border border-white/15 shadow-inner'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  </motion.button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                id="mobile-nav-login-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-3 px-4 rounded-2xl liquid-glass text-slate-200 text-sm font-medium hover:text-white text-center cursor-pointer"
              >
                Login
              </button>
              <button
                id="mobile-nav-signup-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-white text-[#0A0F14] text-sm font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
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
