import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { PublicPage, ProjectVerseLogo } from './Navbar';

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
      className="w-full bg-[#F7F7F5] border-t border-black/8 pt-14 pb-9 px-4 sm:px-8 text-[#4A4A4A] font-serif"
      aria-label="Footer"
    >
      <div className="max-w-5xl mx-auto space-y-9">
        {/* Top section: Distinct brand mark & editorial tagline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 pb-6 border-b border-black/8">
          <div className="flex items-center gap-2.5">
            <ProjectVerseLogo size={24} color="#111111" />
            <span className="font-serif font-bold text-lg sm:text-xl text-[#111111] tracking-wide">
              ProjectVerse
            </span>
          </div>
          <p className="italic text-sm sm:text-[15px] text-[#555555] tracking-wide">
            “Academic projects, built to continue.”
          </p>
        </div>

        {/* Middle section: 3-column Layout with refined typography hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-1">
          {/* LEFT: Mission */}
          <div className="md:col-span-6 space-y-2">
            <h4 className="text-[11.5px] uppercase tracking-[0.08em] text-[#111111] font-bold">
              Mission
            </h4>
            <p className="text-[13px] text-[#555555] leading-relaxed max-w-md">
              Discover, verify, collaborate, and continue academic research and codebases beyond a single batch.
            </p>
          </div>

          {/* CENTER: Navigation */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-[11.5px] uppercase tracking-[0.08em] text-[#111111] font-bold">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-[13px]">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => handleNav('home')}
                  className="text-[#555555] hover:text-[#111111] transition-colors cursor-pointer text-left tracking-wide"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => handleNav('about')}
                  className="text-[#555555] hover:text-[#111111] transition-colors cursor-pointer text-left tracking-wide"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-how-it-works"
                  onClick={() => handleNav('how-it-works')}
                  className="text-[#555555] hover:text-[#111111] transition-colors cursor-pointer text-left tracking-wide"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* RIGHT: Connect */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-[11.5px] uppercase tracking-[0.08em] text-[#111111] font-bold">
              Connect
            </h4>
            <div className="flex items-center gap-2.5 pt-0.5">
              <a
                id="footer-github-link"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-[#111111] hover:text-[#000000] hover:bg-black/5 border border-black/8 hover:border-black/15 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                id="footer-linkedin-link"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-[#111111] hover:text-[#000000] hover:bg-black/5 border border-black/8 hover:border-black/15 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Built by Suraj Rawat • 2026 */}
        <div className="pt-6 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-xs font-serif">
            <span className="text-[#666666] font-normal text-[12.5px]">Built by</span>
            <a
              id="footer-creator-credit"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center font-bold text-[#111111] text-[13px] tracking-wide cursor-pointer transition-all duration-250 ease-out hover:-translate-y-[1.5px] hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-black rounded-xs"
              title="Suraj Rawat • Creator Profile"
            >
              <span>Suraj Rawat</span>
              {/* Thin animated underline growing from left to right */}
              <span 
                className="absolute left-0 bottom-[-1px] w-0 h-[1px] bg-[#111111] transition-all duration-250 ease-out group-hover:w-full pointer-events-none" 
                aria-hidden="true" 
              />
            </a>
            <span className="text-[#8C8C8C] text-[10px]">•</span>
            <span className="text-[#666666] text-[12px] tracking-wide">2026</span>
          </div>

          <div className="text-[#666666] text-[12px] tracking-wide">
            © 2026 ProjectVerse. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
