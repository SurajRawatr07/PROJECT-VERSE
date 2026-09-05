import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin } from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';
import type { PublicPage } from './Navbar';

const GITHUB_URL = 'https://github.com/SurajRawatr07';
const LINKEDIN_URL = 'https://www.linkedin.com/in/suraj-rawat-30513b340/';
const CONTACT_EMAIL = 'rawatsuraj80627@gmail.com';

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

  const handleAction = (_target: 'student' | 'faculty' | 'hod' | 'admin' | 'passport' | 'lineage' | 'matching' | 'verification') => {
    if (onSelectPage) {
      onSelectPage('how-it-works');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.footer
      id="site-footer"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full bg-white dark:bg-[#121216] border-t border-black/[0.08] dark:border-white/[0.08] pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 text-[#111111] dark:text-[#F4F4F6] font-serif transition-colors duration-200"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Layout: Left Brand Area + 4 Link Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-14">
          {/* 1. LEFT BRAND AREA */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            {/* Approved ProjectVerse Branding */}
            <div className="flex items-center gap-2.5">
              <ProjectVerseLogo size={26} color="#111111" />
              <div
                className="flex items-baseline leading-none font-brand text-[#111111] dark:text-[#F4F4F6]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                <span className="text-[19px] sm:text-[20.5px] font-normal tracking-[0.025em] opacity-90">
                  PROJECT
                </span>
                <span className="inline-block w-[0.3em]" aria-hidden="true" />
                <span className="text-[20.5px] sm:text-[22px] font-medium tracking-[0.012em] opacity-100">
                  VERSE
                </span>
              </div>
            </div>

            {/* Short Statement */}
            <p className="text-[14px] sm:text-[14.5px] text-[#555555] dark:text-[#A1A1AA] leading-relaxed max-w-sm font-sans font-normal">
              Connecting academic projects, people and institutions in one ecosystem.
            </p>

            {/* Social Icons Below: Real verified links only */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                id="footer-github-link"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="Suraj Rawat • GitHub"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#222222] dark:text-[#D4D4D8] hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] border border-black/[0.09] dark:border-white/[0.12] hover:border-black/25 dark:hover:border-white/25 transition-all duration-200 cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                id="footer-linkedin-link"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="Suraj Rawat • LinkedIn"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#222222] dark:text-[#D4D4D8] hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.08] border border-black/[0.09] dark:border-white/[0.12] hover:border-black/25 dark:hover:border-white/25 transition-all duration-200 cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. FOOTER LINK COLUMNS (Columns 1-4) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
            {/* Column 1: PROJECTVERSE */}
            <div className="flex flex-col space-y-3 sm:space-y-3.5">
              <h4 className="font-sans text-[11.5px] sm:text-[12px] font-medium text-[#111111] dark:text-[#F4F4F6] tracking-[0.08em] uppercase">
                ProjectVerse
              </h4>
              <ul className="space-y-2.5 text-[13.5px] sm:text-[14px] text-[#555555] dark:text-[#A1A1AA] font-sans">
                <li>
                  <button
                    id="footer-link-home"
                    onClick={() => handleNav('home')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    id="footer-link-about"
                    onClick={() => handleNav('about')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    id="footer-link-how-it-works"
                    onClick={() => handleNav('how-it-works')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    id="footer-link-faq"
                    onClick={() => handleNav('faq')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: PLATFORM */}
            <div className="flex flex-col space-y-3 sm:space-y-3.5">
              <h4 className="font-sans text-[11.5px] sm:text-[12px] font-medium text-[#111111] dark:text-[#F4F4F6] tracking-[0.08em] uppercase">
                Platform
              </h4>
              <ul className="space-y-2.5 text-[13.5px] sm:text-[14px] text-[#555555] dark:text-[#A1A1AA] font-sans">
                <li>
                  <button
                    id="footer-link-platform-student"
                    onClick={() => handleAction('student')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    Student
                  </button>
                </li>
                <li>
                  <button
                    id="footer-link-platform-faculty"
                    onClick={() => handleAction('faculty')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    Faculty
                  </button>
                </li>
                <li>
                  <button
                    id="footer-link-platform-hod"
                    onClick={() => handleAction('hod')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    HOD
                  </button>
                </li>
                <li>
                  <button
                    id="footer-link-platform-admin"
                    onClick={() => handleAction('admin')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    Admin
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: RESOURCES */}
            <div className="flex flex-col space-y-3 sm:space-y-3.5">
              <h4 className="font-sans text-[11.5px] sm:text-[12px] font-medium text-[#111111] dark:text-[#F4F4F6] tracking-[0.08em] uppercase">
                Resources
              </h4>
              <ul className="space-y-2.5 text-[13.5px] sm:text-[14px] text-[#555555] dark:text-[#A1A1AA] font-sans">
                <li>
                  <button
                    id="footer-link-resource-passport"
                    onClick={() => handleAction('passport')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    Project Passport
                  </button>
                </li>
                <li>
                  <button
                    id="footer-link-resource-lineage"
                    onClick={() => handleAction('lineage')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    Project Lineage
                  </button>
                </li>
                <li>
                  <button
                    id="footer-link-resource-ai-matching"
                    onClick={() => handleAction('matching')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    AI Matching
                  </button>
                </li>
                <li>
                  <button
                    id="footer-link-resource-verification"
                    onClick={() => handleAction('verification')}
                    className="hover:text-[#111111] dark:hover:text-[#FFFFFF] transition-colors duration-150 text-left cursor-pointer"
                  >
                    Verification
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: CONTACT (Real existing contact only, no placeholder/fake info) */}
            <div className="flex flex-col space-y-3 sm:space-y-3.5">
              <h4 className="font-sans text-[11.5px] sm:text-[12px] font-medium text-[#111111] dark:text-[#F4F4F6] tracking-[0.08em] uppercase">
                Contact
              </h4>
              <div className="space-y-2 text-[13.5px] sm:text-[14px] text-[#555555] dark:text-[#A1A1AA] font-sans leading-relaxed">
                <div>
                  <span className="text-[11px] font-mono-code text-[#777777] dark:text-[#888892] uppercase tracking-wider block font-medium">Direct Inquiries</span>
                  <a
                    id="footer-contact-email"
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-[#111111] dark:text-[#F4F4F6] hover:text-black dark:hover:text-white font-medium transition-colors break-words text-[13.5px] underline-offset-2 hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div className="pt-1">
                  <span className="text-[11px] font-mono-code text-[#777777] dark:text-[#888892] uppercase tracking-wider block font-medium">Developer</span>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111111] dark:text-[#F4F4F6] hover:text-black dark:hover:text-white font-medium transition-colors text-[13px] inline-flex items-center gap-1"
                  >
                    Suraj Rawat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM AREA: Separator + Copyright & Creator Credit */}
        <div className="pt-6 sm:pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[12.5px] sm:text-[13.5px] font-sans">
          {/* Left: Copyright */}
          <div className="text-[#666666] dark:text-[#90909A]">
            © 2026 ProjectVerse. All Rights Reserved.
          </div>

          {/* Right: Built by Suraj Rawat • 2026 with subtle hover interaction */}
          <div className="flex items-center gap-1.5 text-[#666666] dark:text-[#90909A]">
            <span>Built by</span>
            <a
              id="footer-creator-credit"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center font-medium text-[#111111] dark:text-[#F4F4F6] tracking-normal cursor-pointer transition-all duration-250 ease-out hover:-translate-y-[1.5px] hover:tracking-wide hover:opacity-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white"
              title="Suraj Rawat • GitHub"
            >
              <span>Suraj Rawat</span>
              {/* Subtle underline animation: 200–300ms transition */}
              <span
                className="absolute left-0 bottom-[-1.5px] w-0 h-[1px] bg-[#111111] dark:bg-[#F4F4F6] transition-all duration-250 ease-out group-hover:w-full pointer-events-none"
                aria-hidden="true"
              />
            </a>
            <span className="text-[#999999] dark:text-[#666672] text-[9px] mx-1">•</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

