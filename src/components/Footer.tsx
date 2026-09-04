import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { PublicPage, ProjectVerseLogo, ProjectVerseBrand } from './Navbar';

const GITHUB_URL = 'https://github.com/SurajRawatr07';
const LINKEDIN_URL = 'https://www.linkedin.com/in/suraj-rawat-30513b340/';

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
      className="w-full bg-[#F7F7F5] border-t border-black/8 pt-12 pb-8 px-4 sm:px-8 text-[#4A4A4A] font-body"
      aria-label="Footer"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top section: Editorial Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 pb-6 border-b border-black/8">
          <ProjectVerseBrand
            theme="light"
            logoSize={26}
            textSizeClassName="text-[22px] sm:text-[24px]"
            interactive={true}
          />
          <p className="font-display italic text-base sm:text-lg text-[#4A4A4A] tracking-tight">
            “Academic projects, built to continue.”
          </p>
        </div>

        {/* Middle section: 3-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-2">
          {/* LEFT: Short description */}
          <div className="md:col-span-6 space-y-2.5">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] font-semibold">
              Mission
            </h4>
            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed max-w-md">
              Discover, verify, collaborate and continue academic projects beyond a single batch.
            </p>
          </div>

          {/* CENTER: Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => handleNav('home')}
                  className="text-[#4A4A4A] hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => handleNav('about')}
                  className="text-[#4A4A4A] hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-how-it-works"
                  onClick={() => handleNav('how-it-works')}
                  className="text-[#4A4A4A] hover:text-[#111111] transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* RIGHT: Connect */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] font-semibold">
              Connect
            </h4>
            <div className="flex items-center gap-3 pt-0.5">
              <a
                id="footer-github-link"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-[#111111] hover:text-[#4A4A4A] hover:bg-black/5 border border-black/8 hover:border-black/15 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                id="footer-linkedin-link"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-[#111111] hover:text-[#4A4A4A] hover:bg-black/5 border border-black/8 hover:border-black/15 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Built by Suraj Rawat • 2026 */}
        <div className="pt-6 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-xs font-body">
            <span className="text-[#737373] font-normal text-[12px]">Built by</span>
            <a
              id="footer-creator-credit"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center text-[#111111] font-semibold tracking-normal text-[12px] cursor-pointer transition-all duration-300 ease-out hover:tracking-wide hover:-translate-y-[1.5px] hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-black rounded-sm"
              title="Suraj Rawat • Creator Profile"
            >
              <span>Suraj Rawat</span>
              {/* Thin animated underline growing from left to right */}
              <span 
                className="absolute left-0 bottom-[-1.5px] w-0 h-[1px] bg-[#111111] transition-all duration-300 ease-out group-hover:w-full pointer-events-none" 
                aria-hidden="true" 
              />
            </a>
            <span className="text-[#8C8C8C] text-[10px] font-mono-code">•</span>
            <span className="text-[#737373] font-mono-code text-[11.5px]">2026</span>
          </div>

          <div className="text-[#737373] font-mono-code text-[11.5px]">
            © 2026 ProjectVerse. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
