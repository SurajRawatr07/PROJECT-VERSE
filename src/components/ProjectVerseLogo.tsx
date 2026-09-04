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
      aria-label="PROJECT VERSE PV Symbol"
      {...props}
    >
      {/* 
        FACET 1: The "P" (Project, Academic Foundation, Campus Pillar)
        Vertical structural pillar with precision upper loop and counter.
      */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 5C5.5 4.44772 5.94772 4 6.5 4H16.8C20.666 4 23.8 7.13401 23.8 11C23.8 14.5109 21.2152 17.419 17.8288 17.9176C17.2917 17.9967 16.7454 18 16.2 18H9.5V26.5C9.5 27.0523 9.05228 27.5 8.5 27.5H6.5C5.94772 27.5 5.5 27.0523 5.5 26.5V5ZM9.5 8V14H16.2C17.8569 14 19.2 12.6569 19.2 11C19.2 9.34315 17.8569 8 16.2 8H9.5Z"
        fill={color}
      />

      {/* 
        FACET 2: The "V" (Vision, Verification, Lineage & Continuity)
        Sharp geometric chevron interlocking with the P through calibrated negative space.
      */}
      <path
        d="M13.2 19.4L18.4 27.4C18.65 27.78 19.15 27.78 19.4 27.4L27.1 10.4C27.35 9.85 26.95 9.2 26.35 9.2H22.5C22.15 9.2 21.85 9.4 21.7 9.7L18.9 17.8L16.4 14.5C16.25 14.25 15.95 14.1 15.65 14.1H13.2C12.75 14.1 12.5 14.6 12.75 15L13.2 15.8V19.4Z"
        fill={vColor}
      />
    </svg>
  );
};

export default ProjectVerseLogo;
