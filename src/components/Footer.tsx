import React from 'react';
import { motion } from 'motion/react';
import { ProjectVerseWordmark } from './ProjectVerseWordmark';
import { PublicPage } from './Navbar';
import { GITHUB_URL, LINKEDIN_URL } from '../config/social';

interface FooterProps {
  onSelectPage: (page: PublicPage) => void;
  onOpenLogin: () => void;
}

// Official GitHub vector path
const GitHubIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

// Official LinkedIn vector path
const LinkedInIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

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
    <footer className="w-full bg-[#0B0B0D] text-[#F4F4F6] pt-16 pb-12 px-4 sm:px-6 md:px-8 select-none border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        {/* ========================================================
            FOOTER BRAND STATEMENT (Instrument Serif Display Font)
            "Every Project Deserves a Future."
            ======================================================== */}
        <div className="pb-10 border-b border-white/[0.07]">
          <h2 className="font-serif text-[30px] sm:text-[36px] md:text-[42px] font-normal text-white tracking-[-0.01em] leading-tight">
            Every Project Deserves a Future.
          </h2>
        </div>

        {/* ========================================================
            TOP FOOTER: Brand Signature, Descriptor & Navigation Grid
            ======================================================== */}
        <div className="py-10 flex flex-col lg:flex-row lg:items-start justify-between gap-10 border-b border-white/[0.07]">
          {/* Brand Signature */}
          <div className="max-w-sm shrink-0">
            <div className="mb-3 inline-block">
              <ProjectVerseWordmark
                height={26}
                theme="dark"
                animated={false}
                interactiveHover={true}
              />
            </div>
            <p className="text-[13.5px] text-[#A0A0A8] font-sans leading-relaxed">
              Connecting student projects across campuses.
            </p>
          </div>

          {/* 16. FOOTER NAVIGATION COLUMNS: PRODUCT, PLATFORM, COMPANY, ACCOUNT */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 font-['Manrope',sans-serif] text-left grow max-w-2xl">
            {/* PRODUCT */}
            <div>
              <div className="text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#73737C] mb-3">
                PRODUCT
              </div>
              <ul className="space-y-2.5 text-[13.5px] font-sans">
                <li>
                  <button
                    onClick={() => scrollToAnchor('how-it-works')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    Explore Projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('how-it-works')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('passport')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    Project Passport
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('lineage')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    Project Lineage
                  </button>
                </li>
              </ul>
            </div>

            {/* PLATFORM */}
            <div>
              <div className="text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#73737C] mb-3">
                PLATFORM
              </div>
              <ul className="space-y-2.5 text-[13.5px] font-sans">
                <li>
                  <button
                    onClick={() => scrollToAnchor('roles')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    Students
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('roles')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    Faculty
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('roles')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    HODs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToAnchor('roles')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    Institutions
                  </button>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <div className="text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#73737C] mb-3">
                COMPANY
              </div>
              <ul className="space-y-2.5 text-[13.5px] font-sans">
                <li>
                  <button
                    onClick={() => scrollTo('about')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('faq')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo('about')}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* ACCOUNT */}
            <div>
              <div className="text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#73737C] mb-3">
                ACCOUNT
              </div>
              <ul className="space-y-2.5 text-[13.5px] font-sans">
                <li>
                  <button
                    onClick={onOpenLogin}
                    className="text-[#D0D0D6] hover:text-white hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenLogin}
                    className="text-white font-semibold hover:text-[#00F0FF] hover:translate-x-0.5 transition-all duration-150 cursor-pointer text-left"
                  >
                    Get Started
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================
            17. CREATOR AREA — ONLY ONCE
            After the footer navigation, ONE clean creator block:
            "Built by Suraj Rawat"
            Below it: ONLY TWO social icons (GitHub, LinkedIn)
            ======================================================== */}
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <p className="text-[14px] font-['Manrope',sans-serif] font-medium text-[#ECECEE] tracking-tight mb-3">
            Built by Suraj Rawat
          </p>

          <div className="flex items-center justify-center gap-3">
            {/* GitHub Small Premium Icon Button */}
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile: SurajRawatr07"
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="group relative px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#00F0FF]/40 text-[#D4D4D8] hover:text-white inline-flex items-center gap-2 text-[12.5px] font-['Manrope',sans-serif] font-medium transition-colors duration-200"
            >
              <GitHubIcon size={14} className="transition-colors group-hover:text-[#00F0FF]" />
              <span>GitHub</span>
              <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
            </motion.a>

            {/* LinkedIn Small Premium Icon Button */}
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile: Suraj Rawat"
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="group relative px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#2563EB]/50 text-[#D4D4D8] hover:text-white inline-flex items-center gap-2 text-[12.5px] font-['Manrope',sans-serif] font-medium transition-colors duration-200"
            >
              <LinkedInIcon size={14} className="transition-colors group-hover:text-[#38BDF8]" />
              <span>LinkedIn</span>
              <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
            </motion.a>
          </div>
        </div>

        {/* ========================================================
            21. FOOTER BOTTOM: Thin Divider
            Bottom row:
            LEFT: © 2026 ProjectVerse
            RIGHT: Privacy • Terms
            (NO repeated creator attribution, NO repeated socials)
            ======================================================== */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#787882] font-sans gap-3">
          <div>
            © 2026 ProjectVerse
          </div>

          <div className="flex items-center gap-4 text-[12px]">
            <button
              onClick={() => scrollTo('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span className="text-white/10">•</span>
            <button
              onClick={() => scrollTo('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
