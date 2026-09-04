import React, { useState, useEffect } from 'react';
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
  onOpenRegister,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 25) {
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
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 
        Fixed Top Anchor: Anchored strictly at top-3 sm:top-4 left-0 right-0 z-50.
        ZERO downward or upward translation; the navbar and logo remain anchored.
      */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex items-center justify-center px-3 sm:px-4 pointer-events-none">
        <motion.nav
          id="main-navbar"
          layout
          transition={{
            layout: { type: 'spring', stiffness: 420, damping: 36 },
          }}
          className={`pointer-events-auto rounded-full bg-white border border-black/8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex items-center transition-[padding,height,max-width,box-shadow] duration-200 ease-out ${
            isScrolled
              ? 'w-full max-w-3xl lg:max-w-4xl h-[56px] px-3.5 sm:px-5 justify-between shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
              : 'w-full max-w-4xl lg:max-w-5xl h-[64px] sm:h-[68px] px-4 sm:px-6 justify-between'
          }`}
          aria-label="Main Navigation"
        >
          {/* ========================================================================= */}
          {/* LEFT: [ PV ICON ONLY ] (Strictly no text beside the logo) */}
          {/* ========================================================================= */}
          <div className="flex items-center shrink-0">
            <button
              id="nav-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center justify-center p-1 rounded-full hover:bg-black/5 active:scale-95 transition-all duration-150 focus:outline-none cursor-pointer shrink-0"
              aria-label="ProjectVerse Home"
              title="ProjectVerse"
            >
              <ProjectVerseLogo
                size={isScrolled ? 26 : 28}
                color="#111111"
                accentColor="#111111"
                className="transition-transform duration-200 hover:scale-105"
              />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* CENTER: Desktop Links ONLY [ Home, About, How It Works ] (NO MVP FLOW) */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 font-serif">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`text-[15px] lg:text-[16px] font-normal tracking-wide leading-none px-4 py-2 rounded-full cursor-pointer select-none transition-all duration-150 ${
                currentPage === 'home'
                  ? 'text-[#111111] bg-[#EBEBE7] font-semibold shadow-xs'
                  : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1]'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`text-[15px] lg:text-[16px] font-normal tracking-wide leading-none px-4 py-2 rounded-full cursor-pointer select-none transition-all duration-150 ${
                currentPage === 'about'
                  ? 'text-[#111111] bg-[#EBEBE7] font-semibold shadow-xs'
                  : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1]'
              }`}
            >
              About
            </button>

            <button
              id="nav-link-how-it-works"
              onClick={() => handleNavClick('how-it-works')}
              className={`text-[15px] lg:text-[16px] font-normal tracking-wide leading-none px-4 py-2 rounded-full cursor-pointer select-none transition-all duration-150 ${
                currentPage === 'how-it-works'
                  ? 'text-[#111111] bg-[#EBEBE7] font-semibold shadow-xs'
                  : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1]'
              }`}
            >
              How It Works
            </button>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: [ Login, Get Started ] */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-2.5 font-serif">
            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              className="text-[15px] lg:text-[16px] font-normal tracking-wide leading-none text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F3F3F1] px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer select-none"
            >
              <AccountIcon size={16} className="text-[#4A4A4A]" />
              <span>Login</span>
            </button>

            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className="btn-primary-black inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full cursor-pointer select-none font-semibold text-[15px] tracking-wide shadow-xs hover:shadow-sm active:scale-95 transition-all duration-150"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE: [ MENU ] Toggle */}
          {/* ========================================================================= */}
          <div className="flex md:hidden items-center shrink-0">
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3 py-1.5 rounded-full bg-[#F5F5F3] border border-black/8 flex items-center gap-1.5 text-[#111111] hover:bg-[#ECECE9] focus:outline-none cursor-pointer text-xs font-serif font-semibold"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span>Menu</span>
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER: Only Home, About, How It Works, Login, Get Started */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-24 font-serif"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-black/8">
                <div className="flex items-center gap-2">
                  <ProjectVerseLogo size={26} color="#111111" />
                  <span className="font-serif font-bold text-lg text-[#111111] tracking-wide">ProjectVerse</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F5F5F3] flex items-center justify-center text-[#111111]"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <button
                id="mobile-nav-home"
                onClick={() => handleNavClick('home')}
                className={`flex items-center justify-between text-left py-3.5 px-4 rounded-xl text-[15px] tracking-wide transition-all cursor-pointer ${
                  currentPage === 'home'
                    ? 'bg-[#EBEBE7] text-[#111111] font-bold border border-black/8'
                    : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F7F7F5]'
                }`}
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-[#737373]" />
              </button>

              <button
                id="mobile-nav-about"
                onClick={() => handleNavClick('about')}
                className={`flex items-center justify-between text-left py-3.5 px-4 rounded-xl text-[15px] tracking-wide transition-all cursor-pointer ${
                  currentPage === 'about'
                    ? 'bg-[#EBEBE7] text-[#111111] font-bold border border-black/8'
                    : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F7F7F5]'
                }`}
              >
                <span>About</span>
                <ArrowRight className="w-4 h-4 text-[#737373]" />
              </button>

              <button
                id="mobile-nav-how-it-works"
                onClick={() => handleNavClick('how-it-works')}
                className={`flex items-center justify-between text-left py-3.5 px-4 rounded-xl text-[15px] tracking-wide transition-all cursor-pointer ${
                  currentPage === 'how-it-works'
                    ? 'bg-[#EBEBE7] text-[#111111] font-bold border border-black/8'
                    : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F7F7F5]'
                }`}
              >
                <span>How It Works</span>
                <ArrowRight className="w-4 h-4 text-[#737373]" />
              </button>
            </div>

            <div className="pt-6 border-t border-black/8 flex flex-col gap-3">
              <button
                id="mobile-nav-login-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#F7F7F5] border border-black/8 text-[#111111] text-[15px] font-medium hover:bg-[#ECECE9] text-center inline-flex items-center justify-center gap-2 cursor-pointer"
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
                className="w-full py-3 px-4 rounded-xl bg-[#111111] text-white text-[15px] font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-[#262626] active:scale-[0.98] transition-all cursor-pointer"
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
