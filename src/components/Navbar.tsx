import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ProjectVerseWordmark } from './ProjectVerseWordmark';
import { AccountIcon } from './icons/AccountIcon';

export type PublicPage = 'home' | 'about' | 'how-it-works' | 'faq';

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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (Math.abs(currentScrollY - lastScrollY) > 8) {
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
        lastScrollY = currentScrollY;
      }

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
      <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex items-center justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <motion.nav
          id="main-navbar"
          layout
          initial={false}
          animate={{
            y: 0,
            scale: isCollapsed ? 0.96 : isScrolled ? 0.985 : 1,
            height: isCollapsed ? 46 : isScrolled ? 50 : 54,
            maxWidth: isCollapsed ? 760 : isScrolled ? 850 : 920,
          }}
          transition={{
            type: 'spring',
            stiffness: 340,
            damping: 28,
            mass: 0.8,
          }}
          className={`pointer-events-auto w-full rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] flex items-center justify-between select-none shadow-[0_2px_16px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] transition-colors duration-200 ${
            isCollapsed ? 'px-3 sm:px-4' : isScrolled ? 'px-3.5 sm:px-5' : 'px-4 sm:px-6'
          }`}
          aria-label="Main Navigation"
        >
          {/* LEFT: Custom ProjectVerse Geometric Wordmark (Single horizontal identity) */}
          <div className="flex items-center shrink-0">
            <button
              id="nav-logo-btn"
              onClick={() => scrollToSection('home')}
              className="flex items-center py-1 px-1 rounded-md hover:opacity-95 active:scale-[0.99] transition-all duration-150 focus:outline-none cursor-pointer"
              aria-label="ProjectVerse Home"
              title="ProjectVerse"
            >
              {/* Desktop wordmark: ~135–146px width (fits 120–155px specification) */}
              <div className="hidden sm:block">
                <ProjectVerseWordmark
                  height={isCollapsed ? 17 : isScrolled ? 18 : 19}
                  animated={true}
                  interactiveHover={true}
                />
              </div>
              {/* Mobile wordmark: ~116px width (fits 100–125px specification) */}
              <div className="block sm:hidden">
                <ProjectVerseWordmark
                  height={15}
                  animated={true}
                  interactiveHover={true}
                />
              </div>
            </button>
          </div>

          {/* CENTER: Navigation Links (Home, About, How It Works, FAQ) */}
          <div className="hidden md:flex items-center gap-1 font-['Manrope',sans-serif]">
            {[
              { id: 'home' as PublicPage, label: 'Home' },
              { id: 'about' as PublicPage, label: 'About' },
              { id: 'how-it-works' as PublicPage, label: 'How It Works' },
              { id: 'faq' as PublicPage, label: 'FAQ' },
            ].map(({ id, label }) => {
              const isActive = activePage === id;
              return (
                <button
                  key={id}
                  id={`nav-link-${id}`}
                  onClick={() => scrollToSection(id)}
                  className={`relative text-[13px] leading-none px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-150 inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#111111] bg-[#F0F0EE] font-semibold shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]'
                      : 'text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F5]'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#2563EB] to-[#8B5CF6] shrink-0 animate-pulse" />
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Login & Get Started */}
          <div className="hidden md:flex items-center gap-2 font-['Manrope',sans-serif]">
            <button
              id="nav-login-btn"
              onClick={onOpenLogin}
              className={`font-medium leading-none text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F5] rounded-full inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer select-none ${
                isCollapsed ? 'text-[12.5px] px-2.5 py-1.5' : 'text-[13px] px-3.5 py-1.5'
              }`}
            >
              <AccountIcon size={14} className="text-[#555555]" />
              <span>Login</span>
            </button>

            <button
              id="nav-get-started-btn"
              onClick={onOpenRegister}
              className={`bg-[#111111] hover:bg-black text-white font-medium tracking-normal leading-none rounded-full shadow-2xs hover:shadow-xs active:scale-95 transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer select-none ${
                isCollapsed ? 'text-[12.5px] px-3.5 py-1.5' : 'text-[13px] px-4 py-2'
              }`}
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/90" />
            </button>
          </div>

          {/* MOBILE: Menu Trigger Button */}
          <div className="flex md:hidden items-center shrink-0 font-['Manrope',sans-serif]">
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3 py-1.5 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/[0.06] flex items-center gap-1.5 text-[#111111] focus:outline-none cursor-pointer text-xs font-semibold transition-colors duration-150"
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

      {/* MOBILE NAVIGATION OVERLAY & FLOATING PANEL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 inset-x-3 max-w-sm mx-auto z-50 bg-white/98 backdrop-blur-xl border border-black/[0.08] rounded-3xl p-4 shadow-[0_16px_48px_rgba(0,0,0,0.12)] md:hidden flex flex-col font-['Manrope',sans-serif]"
            >
              <div className="flex items-center justify-between pb-3 mb-1 border-b border-black/[0.06]">
                <div className="flex items-center">
                  <ProjectVerseWordmark height={20} color="#111111" animated={false} interactiveHover={false} />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col space-y-1 my-2">
                <button
                  id="mobile-nav-home"
                  onClick={() => scrollToSection('home')}
                  className={`flex items-center justify-between text-left min-h-[44px] py-2.5 px-3.5 rounded-2xl text-[14px] transition-all cursor-pointer ${
                    activePage === 'home'
                      ? 'bg-[#F0F0EE] text-[#111111] font-semibold'
                      : 'text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F5]'
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
                      ? 'bg-[#F0F0EE] text-[#111111] font-semibold'
                      : 'text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F5]'
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
                      ? 'bg-[#F0F0EE] text-[#111111] font-semibold'
                      : 'text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F5]'
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
                      ? 'bg-[#F0F0EE] text-[#111111] font-semibold'
                      : 'text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F5]'
                  }`}
                >
                  <span>FAQ</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888]" />
                </button>
              </div>

              <div className="pt-3 border-t border-black/[0.06] flex flex-col gap-2">
                <button
                  id="mobile-nav-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full min-h-[44px] py-2.5 px-3 rounded-full bg-[#F7F7F5] hover:bg-[#ECECE8] border border-black/[0.06] text-[#111111] text-[13.5px] font-semibold text-center inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
                  className="w-full min-h-[44px] py-2.5 px-3 rounded-full bg-[#111111] hover:bg-black text-white text-[13.5px] font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
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
