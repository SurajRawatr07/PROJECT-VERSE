import React from 'react';
import type { SVGProps } from 'react';

export interface ProjectVerseLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

/**
 * Custom ProjectVerse Minimal Geometric Technology Symbol
 * 
 * Concept:
 * 1. PROJECT: Central verified diamond-square nucleus anchor node.
 * 2. CONNECTION: Precision geometric tangent and quadrant links to satellite nodes.
 * 3. VERIFICATION: Symmetric structural diamond lattice ensuring cryptographic integrity.
 * 4. CONTINUITY: Continuous orbital perimeter loop weaving students, faculty, institutions, and contributors into a perpetual academic lineage.
 */
export const ProjectVerseLogo: React.FC<ProjectVerseLogoProps> = ({
  size = 28,
  className = '',
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="ProjectVerse Symbol"
      {...props}
    >
      {/* Outer Continuous Academic Lineage Loop (Subtle dashed continuity orbit) */}
      <circle
        cx="16"
        cy="16"
        r="12.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 3.5"
        className="opacity-35"
      />

      {/* Primary Geometric Rhombus Loop: Connecting All 4 Node Quadrants */}
      <path
        d="M16 5.5L26.5 16L16 26.5L5.5 16L16 5.5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Internal Verification Nexus: Cross Rays */}
      <path
        d="M16 5.5V26.5M5.5 16H26.5"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-55"
      />

      {/* Central Verified Project Nucleus (Square with center core) */}
      <rect
        x="12.5"
        y="12.5"
        width="7"
        height="7"
        rx="1.5"
        fill={color}
      />
      <circle
        cx="16"
        cy="16"
        r="1.4"
        fill="white"
      />

      {/* 4 Connected Satellite Nodes (Students, Faculty, Institutions, Future Contributors) */}
      {/* Top Node: Students */}
      <circle cx="16" cy="5.5" r="2.4" fill={color} />
      <circle cx="16" cy="5.5" r="0.9" fill="white" />

      {/* Right Node: Faculty */}
      <circle cx="26.5" cy="16" r="2.4" fill={color} />
      <circle cx="26.5" cy="16" r="0.9" fill="white" />

      {/* Bottom Node: Institutions */}
      <circle cx="16" cy="26.5" r="2.4" fill={color} />
      <circle cx="16" cy="26.5" r="0.9" fill="white" />

      {/* Left Node: Future Contributors */}
      <circle cx="5.5" cy="16" r="2.4" fill={color} />
      <circle cx="5.5" cy="16" r="0.9" fill="white" />
    </svg>
  );
};

export default ProjectVerseLogo;
