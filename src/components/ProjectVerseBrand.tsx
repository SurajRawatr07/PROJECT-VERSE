import React from 'react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

export interface ProjectVerseBrandProps {
  /** Logo size in pixels. Default adapts responsively (24px mobile -> 28px desktop) */
  logoSize?: number;
  /** Custom class for the container */
  className?: string;
  /** Color theme: 'light' (dark text) or 'dark' (white text) */
  theme?: 'light' | 'dark';
  /** Whether to show only the logo, wordmark, or both */
  variant?: 'full' | 'logo-only' | 'wordmark-only';
  /** Custom text sizing class if needed */
  textSizeClassName?: string;
  /** Whether to apply interactive hover transitions */
  interactive?: boolean;
}

/**
 * Premium PROJECT VERSE Brand Identity Component
 * 
 * Typographic & Visual Specifications:
 * - Font: Instrument Serif (weight 400)
 * - PROJECT: slightly smaller / refined letterform
 * - VERSE: slightly more visually dominant
 * - Spacing: Intentional gap between PROJECT and VERSE (PROJECT   VERSE)
 * - Logo: Minimal geometric symbol representing Project, Connection, Verification, Continuity
 * - Sizing: Logo 26–30px desktop / 24–27px mobile, Wordmark 21–24px desktop / 18–21px mobile
 * - Anti-wrap: Strictly white-space: nowrap
 */
export const ProjectVerseBrand: React.FC<ProjectVerseBrandProps> = ({
  logoSize,
  className = '',
  theme = 'light',
  variant = 'full',
  textSizeClassName = '',
  interactive = true,
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-[#111111]';
  const logoColor = isDark ? '#FFFFFF' : '#111111';

  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none whitespace-nowrap align-middle group ${className}`}
    >
      {/* 1. Custom Geometric ProjectVerse Symbol */}
      {variant !== 'wordmark-only' && (
        <div className="shrink-0 flex items-center justify-center">
          {/* Responsive sizing: 25px on mobile, 28px on desktop if not explicitly passed */}
          <div className="block sm:hidden">
            <ProjectVerseLogo
              size={logoSize || 25}
              color={logoColor}
              className={`transition-transform duration-200 ease-out ${
                interactive ? 'group-hover:scale-[1.03]' : ''
              }`}
            />
          </div>
          <div className="hidden sm:block">
            <ProjectVerseLogo
              size={logoSize || 28}
              color={logoColor}
              className={`transition-transform duration-200 ease-out ${
                interactive ? 'group-hover:scale-[1.03]' : ''
              }`}
            />
          </div>
        </div>
      )}

      {/* 2. Editorial Wordmark: PROJECT   VERSE */}
      {variant !== 'logo-only' && (
        <div
          className={`flex items-baseline leading-none font-display font-normal ${textColor} ${
            textSizeClassName || 'text-[19px] sm:text-[22px] md:text-[23.5px]'
          } transition-[letter-spacing,opacity] duration-200 ease-out ${
            interactive ? 'group-hover:opacity-95' : ''
          }`}
          style={{ fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"' }}
        >
          {/* PROJECT (Slightly smaller, refined, open tracking) */}
          <span className="text-[0.91em] tracking-[0.035em] inline-block font-normal">
            PROJECT
          </span>

          {/* Intentional Kerning & Word Gap */}
          <span
            className="inline-block w-[0.34em]"
            aria-hidden="true"
          />

          {/* VERSE (Slightly more visually dominant, elegant proportional presence) */}
          <span className="text-[1.03em] tracking-[-0.015em] inline-block font-normal">
            VERSE
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectVerseBrand;
