import React from 'react';
import type { SVGProps } from 'react';

export interface ProjectVerseLogoProps extends SVGProps<SVGSVGElement> {
  /** Logo size in pixels. Defaults to 28 */
  size?: number;
  /** Primary silhouette color. Defaults to '#111111' */
  color?: string;
  /** Optional subtle accent color for the dynamic V continuity blade. Defaults to primary color */
  accentColor?: string;
  /** Custom CSS class */
  className?: string;
}

/**
 * ProjectVerse Official Geometric "PV" Emblem
 * 
 * An original, minimalist geometric monogram built with connected geometric
 * strokes and razor-sharp negative space.
 * 
 * Concept & Meaning:
 * - "P" (Left & Upper Foundation): Represents Projects, academic research, and grounded knowledge.
 * - "V" (Dynamic Chevron): Represents Vision, Verification, and forward Continuity.
 * - Continuity Nexus: The P loop seamlessly anchors the descending diagonal of the V,
 *   symbolizing projects that never terminate upon submission, but continue into the future.
 * 
 * Visual Attributes:
 * - High-contrast, razor-sharp vector geometry
 * - Distinctive negative space channels
 * - Flawless rendering from 20px up to 128px+
 * - Pure flat vector aesthetic, zero neon / zero 3D / zero clichés
 */
export const ProjectVerseLogo: React.FC<ProjectVerseLogoProps> = ({
  size = 28,
  color = '#111111',
  accentColor,
  className = '',
  ...props
}) => {
  const vColor = accentColor || color;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="ProjectVerse PV Symbol"
      {...props}
    >
      {/* 
        FACET 1: The "P" (Project Foundation & Initiative)
        Grounded vertical spine with precision geometric top loop and counter.
      */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 6C5.5 5.44772 5.94772 5 6.5 5H17.5C21.0899 5 24 7.91015 24 11.5C24 14.8687 21.4312 17.6375 18.1568 17.9659L18 18H10.5V26.5C10.5 27.0523 10.0523 27.5 9.5 27.5H6.5C5.94772 27.5 5.5 27.0523 5.5 26.5V6ZM10.5 9.5V13.5H17.25C18.3546 13.5 19.25 12.6046 19.25 11.5C19.25 10.3954 18.3546 9.5 17.25 9.5H10.5Z"
        fill={color}
      />

      {/* 
        FACET 2: The "V" (Vision, Verification & Continuity)
        Sharp diagonal dynamic chevron interlocking through calibrated negative space.
      */}
      <path
        d="M13.2 19.2L18.2 27.2C18.42 27.55 18.88 27.55 19.1 27.2L26.8 11.2C27.05 10.7 26.75 10.1 26.2 10.1H22.4C22.05 10.1 21.75 10.3 21.6 10.6L18.65 18.8L16.2 14.5C16.05 14.25 15.75 14.1 15.45 14.1H13.2C12.75 14.1 12.5 14.6 12.75 15L13.2 15.8L13.2 19.2Z"
        fill={vColor}
      />
    </svg>
  );
};

export default ProjectVerseLogo;
