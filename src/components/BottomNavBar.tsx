import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { House, Info, Workflow, CircleHelp } from 'lucide-react';
import type { PublicPage } from './Navbar';
import { prefetchView } from '../lib/prefetchService';

interface BottomNavBarProps {
  currentPage: PublicPage;
  onSelectPage: (page: PublicPage) => void;
}

interface NavItem {
  id: PublicPage;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'about', label: 'About', icon: Info },
  { id: 'how-it-works', label: 'How It Works', icon: Workflow },
  { id: 'faq', label: 'FAQ', icon: CircleHelp },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentPage,
  onSelectPage,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleNavClick = (page: PublicPage) => {
    onSelectPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const springTransition = prefersReducedMotion
    ? { duration: 0.1 }
    : { type: 'spring' as const, stiffness: 380, damping: 28, mass: 0.8 };

  return (
    <nav
      id="projectverse-bottom-nav"
      aria-label="Mobile Navigation Bar"
      className="fixed bottom-4 sm:bottom-5 inset-x-0 z-40 flex justify-center items-center pointer-events-none md:hidden px-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div
        className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] select-none max-w-full overflow-hidden"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              layout={!prefersReducedMotion}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => prefetchView(item.id)}
              onFocus={() => prefetchView(item.id)}
              className={`relative flex items-center justify-center gap-1.5 sm:gap-2 h-10 rounded-full cursor-pointer transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-black/20 ${
                isActive
                  ? 'px-3 sm:px-3.5 text-[#111111]'
                  : 'w-10 px-0 text-[#666666] hover:text-[#111111] hover:bg-black/[0.03]'
              }`}
              transition={springTransition}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="active-bottom-pill"
                  className="absolute inset-0 rounded-full bg-black/[0.06] -z-10"
                  transition={springTransition}
                />
              )}

              <Icon size={18} className="shrink-0 relative z-10" />

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { width: 0, opacity: 0 }
                    }
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { width: 0, opacity: 0 }
                    }
                    transition={springTransition}
                    className="relative z-10 overflow-hidden whitespace-nowrap text-[12.5px] sm:text-[13px] font-medium tracking-tight text-[#111111] font-sans"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
