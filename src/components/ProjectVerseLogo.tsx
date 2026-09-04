import React from 'react';
import type { SVGProps } from 'react';

export interface ProjectVerseLogoProps extends SVGProps<SVGSVGElement> {
  /** Logo size in pixels. Defaults to 28 */
  size?: number;
  /** Primary silhouette color. Defaults to '#111111' */
  color?: string;
  /** Optional subtle accent color for the V blade. Defaults to primary color */
  accentColor?: string;
  /** Custom CSS class */
  className?: string;
}

/**
 * ProjectVerse Official Geometric "PV" Emblem
 * 
 * An iconic, minimalist academic-tech monogram integrating "P" and "V"
 * into a single compact geometric mark.
 * 
 * Concept & Meaning:
 * - "P" (Left Vertical Pillar & Knowledge Loop): Represents Projects, academic research, and campus foundation.
 * - "V" (Dynamic Right Chevron): Represents Vision, Verification, and forward Continuity across student cohorts.
 * - Integrated Geometry: The P loop seamlessly interlocks with the descending blade of the V,
 *   symbolizing projects that continue into the future rather than ending at semester submission.
 * 
 * Design Characteristics:
 * - Minimal, geometric, razor-sharp
 * - High contrast, 100% vector
 * - Flawless legibility from 16px (favicon) to 32px (navbar) and beyond
 * - Monochrome purity (pure black/white)
 */
export const ProjectVerseLogo: React.FC<ProjectVerseLogoProps> = ({
  size = 30,
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
      aria-label="PROJECT VERSE PV Symbol"
      {...props}
    >
      {/* 
        FACET 1: The "P" (Project, Academic Foundation, Campus Pillar)
        Clear, bold vertical spine with precision upper loop and open counter.
      */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 4.5H11.8C13.9 4.5 15.4 6.2 15.4 9.5C15.4 12.8 13.9 14.5 11.8 14.5H7.0V27.5H3.5V4.5ZM7.0 7.8V11.2H10.8C11.7 11.2 12.4 10.6 12.4 9.5C12.4 8.4 11.7 7.8 10.8 7.8H7.0Z"
        fill={color}
      />

      {/* 
        FACET 2: The "V" (Verse, Verification, Lineage & Continuity)
        Architectural, symmetrical geometric chevron with full cap-height arms and razor-sharp apex.
      */}
      <path
        d="M16.2 4.5H19.8L22.6 22.8L25.4 4.5H29.0L23.2 27.5C22.9 27.9 22.3 27.9 22.0 27.5L16.2 4.5Z"
        fill={vColor}
      />
    </svg>
  );
};

export default ProjectVerseLogo;
