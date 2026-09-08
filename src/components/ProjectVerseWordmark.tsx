import React, { useId } from 'react';
import { motion } from 'motion/react';

export interface ProjectVerseWordmarkProps {
  /** Height in pixels. Defaults to 22 (renders ~154px width on desktop) */
  height?: number;
  /** Explicit width override (optional; aspect ratio maintained by default) */
  width?: number;
  /** Color theme: 'light' (dark lettering with accent) or 'dark' (white lettering with accent) */
  theme?: 'light' | 'dark';
  /** Primary color override (defaults based on theme) */
  color?: string;
  /** Custom CSS class names */
  className?: string;
  /** Initial page load reveal animation (600–900ms) */
  animated?: boolean;
  /** Enable subtle 1px hover micro-interaction */
  interactiveHover?: boolean;
  /** Unique HTML id */
  id?: string;
}

/**
 * PROJECT VERSE - Official Custom Wordmark
 *
 * A compact, futuristic, geometric technology-company wordmark.
 * Features:
 * - Custom geometric letterforms with precision 45° chamfers and aerodynamic cuts
 * - Controlled cyan → electric blue → violet accent system
 * - "PROJECT" (lighter, slightly smaller, technical) + "VERSE" (dominant, bold, cyber-cut)
 * - Single unified horizontal silhouette with zero font-dependency or FOUT
 * - Micro-interactions: 600-900ms initial load reveal, 250ms 1px hover lift with accent illumination
 */
export const ProjectVerseWordmark: React.FC<ProjectVerseWordmarkProps> = ({
  height = 22,
  width: customWidth,
  theme = 'light',
  color,
  className = '',
  animated = false,
  interactiveHover = true,
  id,
}) => {
  const isDark = theme === 'dark' || color === '#FFFFFF' || color === '#ffffff';
  const instanceId = useId().replace(/:/g, '');
  const gradId = `pv-accent-grad-${instanceId}`;
  const gradGlowId = `pv-accent-glow-${instanceId}`;

  // Canonical aspect ratio: 216 / 28 (~7.71 : 1)
  const calculatedWidth = customWidth || Math.round(height * (216 / 28));

  // Color assignments
  const projectColor = color || (isDark ? '#C7C7CC' : '#323238');
  const verseColor = color || (isDark ? '#FFFFFF' : '#0E0E12');

  const svgElement = (
    <svg
      id={id}
      width={calculatedWidth}
      height={height}
      viewBox="0 0 216 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none overflow-visible ${className}`}
      aria-label="PROJECT VERSE"
      role="img"
    >
      <title>ProjectVerse</title>
      <defs>
        {/* Controlled Technology Accent: Cyan → Electric Blue → Violet */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="52%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        <linearGradient id={gradGlowId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* ========================================================
          PART 1: "PROJECT" (Technical, Refined, Compressed)
          Baseline Y: 7 to 21 (Height 14px)
          ======================================================== */}
      <g id="pv-mark-project" fill={projectColor} className="transition-colors duration-200">
        {/* P */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 5 7 H 14.5 C 17.5 7 19 8.3 19 11 C 19 13.7 17.5 15 14.5 15 H 7.5 V 21 H 5 V 7 Z M 7.5 9.2 V 12.8 H 14.2 C 15.6 12.8 16.5 12.2 16.5 11 C 16.5 9.8 15.6 9.2 14.2 9.2 H 7.5 Z"
        />

        {/* R */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 21.5 7 H 31 C 34 7 35.5 8.3 35.5 10.8 C 35.5 12.8 34.3 14 32.2 14.5 L 36 21 H 33 L 29.5 15 H 24 V 21 H 21.5 V 7 Z M 24 9.2 V 12.8 H 30.7 C 32.2 12.8 33 12.2 33 11 C 33 9.8 32.2 9.2 30.7 9.2 H 24 Z"
        />

        {/* O (Precision Chamfered Octagonal Squircle) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 40.5 7 H 47.5 L 50.5 10 V 18 L 47.5 21 H 40.5 L 37.5 18 V 10 L 40.5 7 Z M 41.2 9.2 L 39.8 10.6 V 17.4 L 41.2 18.8 H 46.8 L 48.2 17.4 V 10.6 L 46.8 9.2 H 41.2 Z"
        />

        {/* J */}
        <path
          d="M 58 7 H 60.5 V 17.5 L 58.2 21 H 54 L 52 19 L 53.6 17.4 L 54.6 18.8 H 57.2 L 58 17.6 V 7 Z"
        />

        {/* E (Aerospace Chamfered Terminals) */}
        <path
          d="M 63.5 7 H 73.5 L 71.8 9.2 H 66 V 12.6 H 72 L 70.8 14.8 H 66 V 18.8 H 73.5 L 71.8 21 H 63.5 V 7 Z"
        />

        {/* C (Faceted Terminal Cuts) */}
        <path
          d="M 85.5 9.8 L 83.7 7.6 L 79 7 H 77.8 L 75 9.8 V 18.2 L 77.8 21 H 83.2 L 85.8 18.4 L 84 16.6 L 82.2 18.8 H 78.2 L 77.2 17.8 V 10.2 L 78.2 9.2 H 82.2 L 84 11.2 Z"
        />

        {/* T (Sharp Technical T) */}
        <path
          d="M 88 7 H 99.5 L 98.2 9.2 H 95 V 21 H 92.5 V 9.2 H 89.3 L 88 7 Z"
        />
      </g>

      {/* ========================================================
          OPTICAL DIVIDER: Technical Micro-Facet with Electric Accent
          ======================================================== */}
      <polygon
        points="102.5,14 104,12.5 105.5,14 104,15.5"
        fill={`url(#${gradId})`}
        className="transition-opacity duration-300"
      />

      {/* ========================================================
          PART 2: "VERSE" (Dominant, Bold, Cyber-Cut, Futuristic)
          Baseline Y: 4.5 to 23.5 (Height 19px)
          Featuring controlled Cyan → Blue → Violet accent
          ======================================================== */}
      <g id="pv-mark-verse" className="transition-colors duration-200">
        {/* V (Sharp Chevron with Dynamic Electric Gradient Accent Blade) */}
        {/* Left Arm: Solid Base */}
        <path
          d="M 109 4.5 H 113.8 L 120.5 23.5 H 116 L 109 4.5 Z"
          fill={verseColor}
        />
        {/* Right Arm & Apex: Electric Technology Accent */}
        <path
          d="M 132 4.5 H 127.2 L 120.5 23.5 H 125 L 132 4.5 Z"
          fill={`url(#${gradId})`}
        />

        {/* E (Futuristic Aerospace Cut E) */}
        <path
          d="M 135 4.5 H 152.5 L 148.8 8.2 H 139 V 12.2 H 150 L 147 15.8 H 139 V 19.8 H 148.8 L 152.5 23.5 H 135 V 4.5 Z"
          fill={verseColor}
        />

        {/* R (Cyber-Cut R with Vector Slanted Foot) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 155 4.5 H 170.5 L 174.5 8.5 V 11.2 L 171.5 14.2 L 174.8 23.5 H 170.2 L 167 15.2 H 159.2 V 23.5 H 155 V 4.5 Z M 159.2 8.2 V 12 H 169.2 L 170.8 10.4 V 9.8 L 169.2 8.2 H 159.2 Z"
          fill={verseColor}
        />

        {/* S (Futuristic Faceted Cyber S with Sharp Diagonal Chamfers) */}
        <path
          d="M 194.5 9 L 190.5 5.2 H 180.5 L 177 8.7 V 11.8 L 180.5 15.3 H 189.5 L 191.2 17 V 19.8 L 187.8 23.2 H 178 L 176 18.8 H 180 L 181.2 19.8 H 186.8 L 187.8 18.8 V 17.8 L 185 15 H 178.8 L 177 13.2 V 9 L 180.5 5.5 H 189.5 L 191.2 7.2 Z"
          fill={verseColor}
        />

        {/* E (Closing Aerospace E with Accent Terminal Micro-Barb) */}
        <path
          d="M 197.5 4.5 H 215 L 211.3 8.2 H 201.5 V 12.2 H 212.5 L 209.5 15.8 H 201.5 V 19.8 H 211.3 L 215 23.5 H 197.5 V 4.5 Z"
          fill={verseColor}
        />
        {/* Subtle Electric Accent Barb on Closing E Center Arm */}
        <rect
          x="208"
          y="13"
          width="4.5"
          height="2"
          rx="1"
          fill={`url(#${gradId})`}
          opacity={0.9}
        />
      </g>
    </svg>
  );

  // Micro-Animation wrapper for load and hover
  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98, x: -5, letterSpacing: '0.04em' }}
        animate={{ opacity: 1, scale: 1, x: 0, letterSpacing: '0em' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        whileHover={
          interactiveHover
            ? {
                y: -1,
                filter: 'brightness(1.06)',
                transition: { duration: 0.25, ease: 'easeOut' },
              }
            : undefined
        }
        className="inline-flex items-center group cursor-pointer"
      >
        <div className="transition-transform duration-250 ease-out group-hover:scale-[1.01]">
          {svgElement}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={
        interactiveHover
          ? {
              y: -1,
              filter: 'brightness(1.06)',
              transition: { duration: 0.25, ease: 'easeOut' },
            }
          : undefined
      }
      className="inline-flex items-center group cursor-pointer"
    >
      <div className="transition-transform duration-250 ease-out group-hover:scale-[1.01]">
        {svgElement}
      </div>
    </motion.div>
  );
};

export default ProjectVerseWordmark;
