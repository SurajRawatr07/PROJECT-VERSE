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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollUpAccumulator = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 80) {
        // At or near top, always show full navbar
        setIsCompact(false);
        scrollUpAccumulator.current = 0;
      } else if (delta > 4 && currentScrollY > 140) {
        // Scrolling down past threshold -> collapse smoothly to compact logo
        setIsCompact(true);
        scrollUpAccumulator.current = 0;
      } else if (delta < -2) {
        // Scrolling up -> accumulate upward scroll distance
        scrollUpAccumulator.current += Math.abs(delta);
        if (scrollUpAccumulator.current > 70) {
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

  const handleExpandNavbar = () => {
    setIsCompact(false);
  };

  return (
    <>
      <header className="fixed top-5 sm:top-6 left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        {/* COMPACT PILL / CIRCULAR BUTTON (When scrolled down) */}
        <AnimatePresence mode="wait">
          {isCompact ? (
            <motion.button
              key="compact-nav"
              id="compact-navbar-btn"
              initial={{ scale: 0.8, opacity: 0, y: -12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              onClick={handleExpandNavbar}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="pointer-events-auto w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white/92 backdrop-blur-[18px] border border-black/8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:border-black/15 text-[#111111] transition-colors cursor-pointer group"
              aria-label="Expand ProjectVerse navigation"
              title="Expand navigation"
            >
              <ProjectVerseLogo
                size={26}
                color="#111111"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </motion.button>
          ) : (
            /* FULL EXPANDED NAVBAR */
            <motion.nav
              key="full-nav"
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="pointer-events-auto w-full max-w-4xl lg:max-w-5xl h-[54px] sm:h-[56px] flex items-center justify-between px-3.5 sm:px-5 rounded-full bg-white/92 backdrop-blur-[18px] border border-black/8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
              aria-label="Main Navigation"
            >
              {/* LEFT: [ ProjectVerse Logo ]  PROJECT   VERSE */}
              <button
                id="nav-logo-btn"
                onClick={() => handleNavClick('home')}
                className="flex items-center text-left focus:outline-none group cursor-pointer shrink-0 py-1 px-1 rounded-full transition-transform duration-200"
                aria-label="ProjectVerse Home"
              >
                <ProjectVerseBrand
                  theme="light"
                  interactive={true}
                  className="hover:opacity-95"
                />
              </button>

              {/* CENTER: Navigation Links (Home, About, How It Works) */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = currentPage === item.page;
                  return (
                    <button
                      key={item.page}
                      id={`nav-link-${item.page}`}
                      onClick={() => handleNavClick(item.page)}
                      className={`relative font-body text-[14px] font-medium tracking-[-0.015em] leading-none px-4 py-2 rounded-full cursor-pointer select-none transition-all duration-200 hover:-translate-y-[1px] ${
                        isActive
                          ? 'text-[#111111] bg-[#EBEBE7] font-semibold shadow-xs'
                          : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1]'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT: AccountIcon Login + Primary Get Started CTA */}
              <div className="hidden md:flex items-center gap-2">
                {/* Secondary AccountIcon Login Button */}
                <button
                  id="nav-login-btn"
                  onClick={onOpenLogin}
                  className="font-body text-[14px] font-medium tracking-[-0.015em] leading-none text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1] px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none hover:-translate-y-[1px]"
                >
                  <AccountIcon size={18} className="text-[#4A4A4A] group-hover:text-[#111111]" />
                  <span>Login</span>
                </button>

                {/* Primary Get Started CTA */}
                <button
                  id="nav-get-started-btn"
                  onClick={onOpenRegister}
                  className="btn-primary-black inline-flex items-center gap-1.5 px-4.5 py-2.5 cursor-pointer select-none"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>

              {/* MOBILE MENU TOGGLE BUTTON */}
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
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE DRAWER / OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-24"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-black/8">
                <ProjectVerseBrand
                  theme="light"
                  interactive={false}
                  textSizeClassName="text-[20px]"
                />
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
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between text-left py-3.5 px-4 rounded-xl text-[16px] font-medium tracking-[-0.015em] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#EBEBE7] text-[#111111] font-semibold border border-black/8'
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
                className="w-full py-3.5 px-4 rounded-xl bg-[#F7F7F5] border border-black/8 text-[#111111] text-[15px] font-medium hover:bg-[#ECECE9] text-center inline-flex items-center justify-center gap-2 cursor-pointer"
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
