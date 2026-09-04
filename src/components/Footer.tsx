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
      className="w-full bg-[#F7F7F5] border-t border-black/8 py-10 sm:py-12 px-4 sm:px-8 text-[#4A4A4A] font-serif"
      aria-label="Footer"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Brand: PROJECT VERSE */}
        <div className="flex items-center justify-center gap-2.5">
          <ProjectVerseLogo size={22} color="#111111" />
          <span className="font-serif font-bold text-[17px] sm:text-[19px] text-[#111111] tracking-wider uppercase">
            Project Verse
          </span>
        </div>

        {/* Short Statement: Discover. Build. Verify. Continue. */}
        <p className="text-[13.5px] sm:text-[14.5px] text-[#555555] tracking-wide">
          Discover. Build. Verify. Continue.
        </p>

        {/* Navigation Links: Home, About, How It Works */}
        <div className="flex items-center justify-center gap-6 text-[13.5px] sm:text-[14px]">
          <button
            id="footer-nav-home"
            onClick={() => handleNav('home')}
            className="text-[#4A4A4A] hover:text-[#111111] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-black/15">•</span>
          <button
            id="footer-nav-about"
            onClick={() => handleNav('about')}
            className="text-[#4A4A4A] hover:text-[#111111] transition-colors cursor-pointer"
          >
            About
          </button>
          <span className="text-black/15">•</span>
          <button
            id="footer-nav-how-it-works"
            onClick={() => handleNav('how-it-works')}
            className="text-[#4A4A4A] hover:text-[#111111] transition-colors cursor-pointer"
          >
            How It Works
          </button>
        </div>

        {/* Connect Icons */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <a
            id="footer-github-link"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-full text-[#111111] hover:text-black hover:bg-black/5 border border-black/8 hover:border-black/20 transition-all duration-200"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            id="footer-linkedin-link"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-full text-[#111111] hover:text-black hover:bg-black/5 border border-black/8 hover:border-black/20 transition-all duration-200"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Minimal Bottom Bar: Built by Suraj Rawat • 2026 */}
        <div className="pt-5 border-t border-black/8 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] sm:text-[14px]">
          <div className="flex items-center gap-2 font-serif">
            <span className="text-[#666666]">Built by</span>
            <a
              id="footer-creator-credit"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center font-bold text-[#111111] tracking-wide cursor-pointer transition-all duration-250 ease-out hover:-translate-y-[1.5px] hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
              title="Suraj Rawat • Creator Profile"
            >
              <span>Suraj Rawat</span>
              {/* Subtle underline animation */}
              <span 
                className="absolute left-0 bottom-[-1px] w-0 h-[1px] bg-[#111111] transition-all duration-250 ease-out group-hover:w-full pointer-events-none" 
                aria-hidden="true" 
              />
            </a>
            <span className="text-[#8C8C8C] text-[10px]">•</span>
            <span className="text-[#666666]">2026</span>
          </div>

          <div className="text-[#737373] text-[12px] sm:text-[13px]">
            © 2026 ProjectVerse. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
