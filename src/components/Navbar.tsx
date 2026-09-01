import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Layers } from 'lucide-react';

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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 sm:px-6 py-4 pointer-events-none transition-all duration-300">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between px-5 sm:px-7 py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'liquid-glass-nav border-white/15 shadow-2xl backdrop-blur-xl'
              : 'liquid-glass border-white/10 backdrop-blur-lg'
          }`}
          aria-label="Main Navigation"
        >
          {/* Left: Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            aria-label="ProjectVerse Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-slate-900 border border-indigo-400/30 flex items-center justify-center text-white font-bold text-sm shadow-inner group-hover:border-indigo-400/60 transition-all">
              <Layers className="w-4 h-4 text-indigo-200" />
            </div>
            <span className="font-semibold tracking-wider text-base sm:text-lg text-white font-body">
              PROJECT<span className="text-indigo-400">VERSE</span>
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
                  className={`relative text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill-indicator"
                      className="absolute inset-0 bg-white/10 border border-white/15 rounded-full shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Login | Get Started */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/5 transition-all duration-150 cursor-pointer"
            >
              Login
            </button>
            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-white text-slate-950 hover:bg-slate-100 px-4 py-2 rounded-full font-body shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-slate-200 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu: Elegant liquid-glass fullscreen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#040714]/90 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-24"
          >
            <div className="flex flex-col space-y-3">
              <div className="text-[11px] font-semibold tracking-widest text-indigo-400 uppercase mb-2">
                ProjectVerse
              </div>
              {navItems.map((item, idx) => {
                const isActive = currentPage === item.page;
                return (
                  <motion.button
                    key={item.page}
                    id={`mobile-nav-link-${item.page}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between text-left py-3.5 px-4 rounded-xl text-lg font-medium transition-all ${
                      isActive
                        ? 'bg-white/10 text-white border border-white/20'
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
                className="w-full py-3 px-4 rounded-xl liquid-glass text-slate-200 text-sm font-medium hover:text-white text-center cursor-pointer"
              >
                Login
              </button>
              <button
                id="mobile-nav-signup-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-white text-slate-950 text-sm font-semibold flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
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
