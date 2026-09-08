import React from 'react';
import { ProjectVerseWordmark } from './ProjectVerseWordmark';
import { PublicPage } from './Navbar';

interface FooterProps {
  onSelectPage: (page: PublicPage) => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPage,
  onOpenLogin,
}) => {
  const scrollTo = (id: PublicPage) => {
    onSelectPage(id);
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -72;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#0E0E10] text-[#F4F4F6] pt-16 pb-12 px-4 sm:px-6 md:px-8 select-none border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        {/* Top Branding Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between pb-12 border-b border-white/[0.08] gap-8">
          <div>
            {/* Same Custom ProjectVerse Wordmark in White */}
            <div className="mb-3">
              <ProjectVerseWordmark
                height={26}
                color="#FFFFFF"
                animated={false}
                interactiveHover={true}
              />
            </div>
            <p className="text-[14px] text-[#A0A0A5] font-sans max-w-sm mt-2">
              Connecting student projects across campuses.
            </p>
          </div>

          {/* Footer Grid: PRODUCT, COMMUNITY, COMPANY, ACCOUNT */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 font-['Manrope',sans-serif]">
            {/* PRODUCT */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#787880] mb-3">
                PRODUCT
              </div>
              <ul className="space-y-2 text-[13.5px]">
                <li>
                  <button
                    onClick={() => scrollToAnchor('how-it-works')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Explore Projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('how-it-works')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('passport')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Project Passport
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('lineage')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Project Lineage
                  </button>
                </li>
              </ul>
            </div>

            {/* COMMUNITY */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#787880] mb-3">
                COMMUNITY
              </div>
              <ul className="space-y-2 text-[13.5px]">
                <li>
                  <button
                    onClick={() => scrollToAnchor('roles')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Students
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('roles')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Faculty
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('roles')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    HODs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('roles')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Institutions
                  </button>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#787880] mb-3">
                COMPANY
              </div>
              <ul className="space-y-2 text-[13.5px]">
                <li>
                  <button
                    onClick={() => scrollTo('about')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('faq')}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <span className="text-[#888890] cursor-default">
                    Contact
                  </span>
                </li>
              </ul>
            </div>

            {/* ACCOUNT */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#787880] mb-3">
                ACCOUNT
              </div>
              <ul className="space-y-2 text-[13.5px]">
                <li>
                  <button
                    onClick={onOpenLogin}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenLogin}
                    className="text-[#D0D0D5] hover:text-white transition-colors cursor-pointer text-left font-semibold text-white"
                  >
                    Get Started
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Built by Suraj Rawat, Privacy, Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[12.5px] text-[#888890] font-sans gap-4">
          <div>
            © 2026 ProjectVerse
          </div>

          {/* Built by Suraj Rawat with subtle emphasis & hover animation */}
          <div>
            <span className="inline-block font-medium text-white transition-transform duration-250 hover:-translate-y-0.5 hover:underline cursor-pointer">
              Built by Suraj Rawat
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy
            </span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
