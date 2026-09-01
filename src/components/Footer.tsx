import React from 'react';
import { PublicPage } from './Navbar';

interface FooterProps {
  onSelectPage: (page: PublicPage) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPage,
  onOpenLogin,
  onOpenRegister
}) => {
  const handlePage = (page: PublicPage) => {
    onSelectPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070B0F] dark:bg-[#070B0F] border-t border-white/8 pt-16 pb-12 px-4 sm:px-6 text-slate-400 font-body transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-display text-[26px] font-normal tracking-[-0.04em] text-white">
                PROJECT<span className="text-indigo-400 dark:text-indigo-300">VERSE</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              “Where academic projects find their next chapter.”
            </p>
            <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
              The universal ecosystem for students, faculty, and institutions to turn academic projects into work that continues.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-white font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handlePage('home')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('about')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  About ProjectVerse
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('how-it-works')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Access */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-white font-semibold">
              Academic Access
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenLogin}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRegister}
                  className="text-indigo-400 dark:text-indigo-300 hover:underline font-semibold transition-colors cursor-pointer"
                >
                  Get Started (Register)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono-code">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">ProjectVerse Academic Network Active</span>
          </div>

          <div>
            © {new Date().getFullYear()} ProjectVerse. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
