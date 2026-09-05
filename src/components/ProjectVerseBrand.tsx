import React from 'react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

export interface ProjectVerseBrandProps {
  /** Logo size in pixels. Default adapts responsively (24-25px mobile -> 28px desktop) */
  logoSize?: number;
  /** Custom class for the container */
  className?: string;
  /** Color theme: 'light' (dark text) or 'dark' (white text) */
  theme?: 'light' | 'dark';
  /** Whether to show only the logo, wordmark, or both */
  variant?: 'full' | 'logo-only' | 'wordmark-only';
  /** Collapsed sidebar mode: centers the logo symbol cleanly without text clipping */
  collapsed?: boolean;
  /** Custom text sizing class if needed */
  textSizeClassName?: string;
  /** Whether to apply interactive hover transitions */
  interactive?: boolean;
}

/**
 * Premium PROJECT VERSE Brand Identity Component
 * 
 * Typographic & Visual Specifications:
 * - Wordmark Font: Instrument Serif (weight 400)
 * - Brand Name: "PROJECT VERSE" (Strictly displayed as TWO WORDS)
 * - "PROJECT": slightly smaller, subtle, refined letterform
 * - "VERSE": slightly more visually dominant, elegant editorial presence
 * - Symbol: Distinctive geometric academic ecosystem mark representing:
 *   CAMPUS → STUDENT → PROJECT → COLLABORATION → KNOWLEDGE CONTINUITY
 * - Sizing: Logo 26–30px desktop / 24–27px mobile; Wordmark 21–24px desktop / 18–21px mobile
 * - Anti-wrap: Strictly white-space: nowrap
 */
export const ProjectVerseBrand: React.FC<ProjectVerseBrandProps> = ({
  logoSize,
  className = '',
  theme,
  variant = 'full',
  collapsed = false,
  textSizeClassName = '',
  interactive = true,
}) => {
  const isDarkForced = theme === 'dark';
  const textColor = isDarkForced
    ? 'text-white'
    : theme === 'light'
    ? 'text-[#0F172A] dark:text-[#F4F4F6]'
    : 'text-[#0F172A] dark:text-[#F4F4F6]';
  const logoColor = isDarkForced ? '#FFFFFF' : undefined;
  const accentColor = isDarkForced ? '#60A5FA' : '#2563EB';

  const showWordmark = !collapsed && variant !== 'logo-only';
  const showLogo = variant !== 'wordmark-only';

  return (
    <div
      className={`inline-flex items-center select-none whitespace-nowrap align-middle group ${
        collapsed ? 'justify-center w-full' : 'gap-2.5 sm:gap-3'
      } ${className}`}
    >
      {/* 1. Distinctive Geometric ProjectVerse Symbol */}
      {showLogo && (
        <div className={`shrink-0 flex items-center justify-center ${collapsed ? 'mx-auto' : ''}`}>
          {/* Responsive sizing: 26px on mobile, 30px on desktop if not explicitly passed */}
          <div className="block sm:hidden">
            <ProjectVerseLogo
              size={logoSize || 26}
              color={logoColor}
              accentColor={accentColor}
              className={`transition-transform duration-220 ease-out ${
                interactive ? 'group-hover:scale-[1.03]' : ''
              }`}
            />
          </div>
          <div className="hidden sm:block">
            <ProjectVerseLogo
              size={logoSize || 30}
              color={logoColor}
              accentColor={accentColor}
              className={`transition-transform duration-220 ease-out ${
                interactive ? 'group-hover:scale-[1.03]' : ''
              }`}
            />
          </div>
        </div>
      )}

      {/* 2. Editorial Wordmark: PROJECT VERSE (Strictly Two Words in Instrument Serif) */}
      {showWordmark && (
        <div
          className={`flex items-baseline leading-none font-brand ${textColor} ${
            textSizeClassName || 'text-[19px] sm:text-[21px] md:text-[22px]'
          } transition-[letter-spacing,opacity] duration-220 ease-out ${
            interactive ? 'group-hover:opacity-90' : ''
          }`}
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          {/* PROJECT: slightly lighter, refined tracking */}
          <span className="text-[0.92em] tracking-[0.025em] inline-block font-normal opacity-90">
            PROJECT
          </span>

          {/* Intentional space gap between PROJECT and VERSE */}
          <span
            className="inline-block w-[0.32em]"
            aria-hidden="true"
          />

          {/* VERSE: slightly stronger visual presence */}
          <span className="text-[1.02em] tracking-[0.012em] inline-block font-medium opacity-100">
            VERSE
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectVerseBrand;
