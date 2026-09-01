import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { PublicPage, ProjectVerseLogo } from './Navbar';

const GITHUB_URL = 'https://github.com/SurajRawatr07';
const LINKEDIN_URL = 'YOUR_LINKEDIN_URL';

interface FooterProps {
  onSelectPage?: (page: PublicPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage }) => {
  const handleNav = (page: PublicPage) => {
    if (onSelectPage) {
      onSelectPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="site-footer"
      className="w-full bg-[#F7F7F5] dark:bg-[#090A0C] border-t border-black/8 dark:border-white/8 transition-colors duration-300 pt-12 pb-8 px-4 sm:px-8 text-[#404040] dark:text-[#A1A1AA] font-body"
      aria-label="Footer"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top section: Editorial Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 pb-6 border-b border-black/8 dark:border-white/8">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <ProjectVerseLogo className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <span className="font-display text-[22px] sm:text-[24px] font-normal tracking-[-0.035em] text-[#111111] dark:text-[#F5F5F5]">
              PROJECT<span className="inline-block w-[0.22em]" aria-hidden="true" />VERSE
            </span>
          </div>
          <p className="font-display italic text-base sm:text-lg text-[#404040] dark:text-[#A1A1AA] tracking-tight">
            “Academic projects, built to continue.”
          </p>
        </div>

        {/* Middle section: 3-column Layout (Left: Description, Center: Navigation, Right: Connect) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-2">
          {/* LEFT: Short description */}
          <div className="md:col-span-6 space-y-2.5">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] font-semibold">
              Mission
            </h4>
            <p className="text-xs sm:text-sm text-[#404040] dark:text-[#A1A1AA] leading-relaxed max-w-md">
              Discover, verify, collaborate and continue academic projects beyond a single batch.
            </p>
          </div>

          {/* CENTER: Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => handleNav('home')}
                  className="text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => handleNav('about')}
                  className="text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-how-it-works"
                  onClick={() => handleNav('how-it-works')}
                  className="text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* RIGHT: Connect */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] font-semibold">
              Connect
            </h4>
            <div className="flex items-center gap-3 pt-0.5">
              <a
                id="footer-github-link"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                id="footer-linkedin-link"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-[#404040] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Built by Suraj Rawat & Copyright */}
        <div className="pt-6 border-t border-black/8 dark:border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#404040] dark:text-[#A1A1AA]">
            <span className="text-[#666666] dark:text-[#71717A] font-normal">Built by </span>
            <span className="text-[#111111] dark:text-[#F5F5F5] font-semibold tracking-normal">Suraj Rawat</span>
          </div>

          <div className="text-[#666666] dark:text-[#71717A] font-mono-code text-[11.5px]">
            © 2026 ProjectVerse. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
