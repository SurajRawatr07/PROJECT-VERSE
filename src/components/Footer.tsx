import React from 'react';
import { ProjectVerseLogo } from './ProjectVerseLogo';
import type { PublicPage } from './Navbar';

interface FooterProps {
  onSelectPage?: (page: PublicPage) => void;
  onOpenLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage, onOpenLogin }) => {
  const scrollTo = (sectionId: PublicPage) => {
    if (onSelectPage) {
      onSelectPage(sectionId);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -72;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="site-footer"
      className="w-full bg-white border-t border-black/[0.08] py-12 sm:py-16 px-4 sm:px-6 select-none"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Logo: PROJECT VERSE */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2.5 mb-6 group cursor-pointer focus:outline-none"
          aria-label="PROJECT VERSE"
        >
          <ProjectVerseLogo size={24} color="#111111" className="group-hover:scale-105 transition-transform" />
          <div className="flex items-baseline leading-none text-[#111111] font-serif">
            <span className="text-[17px] sm:text-[18px] font-normal tracking-[0.025em] opacity-85">
              PROJECT
            </span>
            <span className="inline-block w-[0.26em]" aria-hidden="true" />
            <span className="text-[18px] sm:text-[19px] font-medium tracking-[0.012em] opacity-100">
              VERSE
            </span>
          </div>
        </button>

        {/* Links: Home • About • How It Works • FAQ • Login */}
        <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mb-8 text-[13.5px] sm:text-[14px] font-sans text-[#555555]">
          <button
            onClick={() => scrollTo('home')}
            className="hover:text-[#111111] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-[#111111] transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-[#111111] transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-[#111111] transition-colors cursor-pointer"
          >
            FAQ
          </button>
          {onOpenLogin && (
            <button
              onClick={onOpenLogin}
              className="hover:text-[#111111] transition-colors cursor-pointer font-medium"
            >
              Login
            </button>
          )}
        </nav>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-black/[0.08] mb-8" />

        {/* Bottom text: “Built by Suraj Rawat • 2026” */}
        <p className="text-[12.5px] sm:text-[13px] text-[#777777] font-sans">
          Built by Suraj Rawat • 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
