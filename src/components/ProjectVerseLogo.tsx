import React from 'react';
import type { SVGProps } from 'react';

export interface ProjectVerseLogoProps extends SVGProps<SVGSVGElement> {
  /** Logo size in pixels. Defaults to 30 */
  size?: number;
  /** Primary silhouette color. Defaults to '#111111' */
  color?: string;
  /** Optional subtle accent color for the V facet. Defaults to primary color */
  accentColor?: string;
  /** Custom CSS class */
  className?: string;
}

/**
 * ProjectVerse Official Geometric "PV" Monogram
 * 
 * An iconic, minimal, and intelligent academic-tech brand mark.
 * 
 * Concept & Construction:
 * - P forms the primary structural shape: full-height vertical foundation spine + upper academic loop
 * - V is integrated into the lower/inner geometry beneath the loop
 * - Negative space reveals the V chevron and separates the foundation pillar
 * - Works flawlessly from 20px (favicon/mobile) to 32px (navbar) and beyond in pure monochrome
 */
export const ProjectVerseLogo: React.FC<ProjectVerseLogoProps> = ({
  size = 30,
  color,
  accentColor,
  className = '',
  ...props
}) => {
  // If not explicitly overridden with a custom accent, default to currentColor to inherit theme text
  const isDefaultDarkTone = !color || color === '#111111' || color === '#0F172A';
  const resolvedColor = isDefaultDarkTone ? 'currentColor' : color;
  const vColor = accentColor || resolvedColor;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none text-[#111111] dark:text-[#F4F4F6] ${className}`}
      aria-label="PROJECT VERSE Monogram"
      {...props}
    >
      {/* 
        FACET 1: The "P" (Project, Academic Foundation, Research Pillar)
        Primary structural silhouette with vertical spine and precision upper loop with counter.
      */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 4.5H20.5C24.4 4.5 26.8 7.3 26.8 10.6C26.8 13.8 24.4 15.8 20.5 15.8H9.5V27.5H4.5V4.5ZM9.5 8.6V12.2H19.8C21.2 12.2 22.2 11.4 22.2 10.5C22.2 9.5 21.2 8.6 19.8 8.6H9.5Z"
        fill={resolvedColor}
      />

      {/* 
        FACET 2: The "V" (Verse, Verification, Cross-Cohort Continuity)
        Architectural geometric chevron integrated into the lower-right geometry beneath the P loop.
        Calibrated negative space channel (2.5px) separates the V from the P foundation spine.
      */}
      <path
        d="M12.0 16.8H15.4L18.5 23.2L21.6 16.8H25.0L18.5 27.5L12.0 16.8Z"
        fill={vColor}
      />
    </svg>
  );
};

export default ProjectVerseLogo;

