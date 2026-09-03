import React from 'react';
import type { SVGProps } from 'react';

export interface ProjectVerseLogoProps extends SVGProps<SVGSVGElement> {
  /** Logo size in pixels. Defaults to 28 */
  size?: number;
  /** Primary silhouette/stroke color. Defaults to 'currentColor' */
  color?: string;
  /** Optional restrained accent color for the cross-campus continuity bridge (e.g. #2563EB). If omitted, uses primary color. */
  accentColor?: string;
  /** Custom CSS class */
  className?: string;
}

/**
 * ProjectVerse Official Emblem — Distinctive Geometric Ecosystem Mark
 * 
 * Design Concept:
 * 1. DUAL ACADEMIC FOLIO & CROSS-CAMPUS NODES:
 *    Two interconnected geometric wings evoke open academic folios and 
 *    cross-institutional campuses collaborating on high-value research/engineering.
 * 2. SUBTLE "P" & "V" DUALITY:
 *    The left wing loops gracefully to contour an academic "P" (Project),
 *    while the upward converging wings form a proud, geometric "V" (Verse / Verification).
 * 3. KNOWLEDGE CONTINUITY BRIDGE:
 *    The top connection bridge links student batches and universities together,
 *    symbolizing projects that never die upon submission, but continue into the future.
 * 4. VERIFIED CORE MILESTONE:
 *    The central diamond anchor represents the cryptographically sealed Project Passport.
 * 
 * Works flawlessly in pure black (#111827), pure white, or monochrome, from 18px to 128px+.
 */
export const ProjectVerseLogo: React.FC<ProjectVerseLogoProps> = ({
  size = 28,
  color = 'currentColor',
  accentColor,
  className = '',
  ...props
}) => {
  const accent = accentColor || color;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="ProjectVerse Logo"
      {...props}
    >
      {/* 1. Top Cross-Campus Collaboration & Continuity Bridge */}
      <path
        d="M10 9C11.6 6.8 13.6 5.5 16 5.5C18.4 5.5 20.4 6.8 22 9"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. Left Campus Folio / "P" Continuation Path */}
      {/* Rises from foundation anchor (16, 26.5), arches up through left campus crest (9.5, 9.5), then loops inward to central project nexus (16, 13.5) */}
      <path
        d="M16 26.5C11.5 22.8 7 17.5 7 12.8C7 8.8 9.8 7 13.2 7.2C15 7.3 16 8.5 16 10.2V14"
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Right Campus Folio / "V" Convergence Path */}
      {/* Mirrors and extends upward through right campus crest (22.5, 9.5) and flows into foundation anchor (16, 26.5) */}
      <path
        d="M16 10.2C16 8.5 17 7.3 18.8 7.2C22.2 7 25 8.8 25 12.8C25 17.5 20.5 22.8 16 26.5"
        stroke={color}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 4. Internal Academic Synergy Lines (Open Book Leaf Ribs) */}
      <path
        d="M11 16.5C12.8 17.8 14.5 18.8 16 19.5C17.5 18.8 19.2 17.8 21 16.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />

      {/* 5. Central Verified Project Passport Milestone (Diamond Nucleus) */}
      <rect
        x="13.5"
        y="12"
        width="5"
        height="5"
        rx="1.2"
        transform="rotate(45 16 14.5)"
        fill={color}
      />
      {/* Central Core Light Aperture */}
      <circle
        cx="16"
        cy="14.5"
        r="1"
        fill="white"
      />

      {/* 6. Campus Anchor Nodes (Originating Institution & Collaborating Partner) */}
      {/* Campus A Node (Student/Batch N) */}
      <circle cx="9.5" cy="9.5" r="2" fill={accent} />
      <circle cx="9.5" cy="9.5" r="0.75" fill="white" />

      {/* Campus B Node (Cross-Campus Partner/Batch N+1) */}
      <circle cx="22.5" cy="9.5" r="2" fill={accent} />
      <circle cx="22.5" cy="9.5" r="0.75" fill="white" />

      {/* 7. Foundation Lineage Anchor (Unified Campus Registry) */}
      <circle cx="16" cy="26.5" r="1.75" fill={color} />
      <circle cx="16" cy="26.5" r="0.6" fill="white" />
    </svg>
  );
};

export default ProjectVerseLogo;
