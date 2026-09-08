import React from 'react';
import { motion } from 'motion/react';

export interface ProjectVerseWordmarkProps {
  /** Height in pixels. Default is 26 */
  height?: number;
  /** Primary color (default: '#111111'). Supports '#FFFFFF' for dark footers */
  color?: string;
  /** Optional secondary accent color for the technical bridge facet */
  accentColor?: string;
  /** Custom CSS classes */
  className?: string;
  /** Initial page load reveal animation (opacity 0->1, tiny scale 0.98->1, 500-700ms) */
  animated?: boolean;
  /** Enable subtle 1-2px hover translation for interactive placements (e.g. navbar) */
  interactiveHover?: boolean;
  /** Unique HTML id */
  id?: string;
}

/**
 * ProjectVerse Official Custom Wordmark
 * 
 * An intentionally designed, geometric, sharp, compact, futuristic wordmark.
 * Inspired by modern high-end software & developer infrastructure identity (e.g. Vyronex reference).
 * 
 * Architectural Characteristics:
 * - "PROJECT": Clean, refined, technical geometric letterforms with precision chamfers and cuts
 * - "VERSE": Bold, dominant, futuristic geometry with aerodynamic cuts and sharp 45° terminal angles
 * - Integrated as ONE compact horizontal identity with tight optical kerning
 * - 100% SVG Vector paths: zero-fout, crisp rendering on any DPI, transparent background
 */
export const ProjectVerseWordmark: React.FC<ProjectVerseWordmarkProps> = ({
  height = 26,
  color = '#111111',
  accentColor,
  className = '',
  animated = false,
  interactiveHover = true,
  id,
}) => {
  // Canonical aspect ratio: 252 : 32
  const width = Math.round(height * (252 / 32));
  const primaryColor = color;
  const bridgeColor = accentColor || primaryColor;

  const svgContent = (
    <svg
      id={id}
      width={width}
      height={height}
      viewBox="0 0 252 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none overflow-visible ${className}`}
      aria-label="PROJECT VERSE"
      role="img"
    >
      <title>ProjectVerse</title>

      {/* ========================================================
          PART 1: "PROJECT" (Technical, Refined, Geometric)
          Y: 8.5 to 23.5 (Height 15) | Precision optical cuts
          ======================================================== */}
      <g id="pv-wordmark-project" fill={primaryColor} opacity={0.85}>
        {/* P */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 6 8.5 H 17 C 20 8.5 21.5 10 21.5 12.8 C 21.5 15.6 20 17.1 17 17.1 H 8.8 V 23.5 H 6 V 8.5 Z M 8.8 11 V 14.6 H 16.7 C 18.2 14.6 18.9 13.8 18.9 12.8 C 18.9 11.8 18.2 11 16.7 11 H 8.8 Z"
        />

        {/* R */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 24.5 8.5 H 35.5 C 38.5 8.5 40 10 40 12.7 C 40 14.8 38.8 16.2 36.6 16.7 L 40.5 23.5 H 37.3 L 33.7 17.1 H 27.2 V 23.5 H 24.5 V 8.5 Z M 27.2 11 V 14.6 H 35.2 C 36.8 14.6 37.5 13.9 37.5 12.8 C 37.5 11.7 36.8 11 35.2 11 H 27.2 Z"
        />

        {/* O (Hexagonal Technical Squircle with 45° Chamfered Edges) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 46 8.5 H 53.5 L 56.5 11.5 V 20.5 L 53.5 23.5 H 46 L 43 20.5 V 11.5 L 46 8.5 Z M 46.8 11.1 L 45.4 12.5 V 19.5 L 46.8 20.9 H 52.7 L 54.1 19.5 V 12.5 L 52.7 11.1 H 46.8 Z"
        />

        {/* J */}
        <path
          d="M 65.5 8.5 H 68.2 V 19.8 L 65.7 23.5 H 60.8 L 58.5 21.2 L 60.3 19.4 L 61.5 20.9 H 64.8 L 65.5 19.8 V 8.5 Z"
        />

        {/* E (With Technical Chamfered Terminals) */}
        <path
          d="M 71.5 8.5 H 82.5 L 80.5 11 H 74.2 V 14.8 H 80.8 L 79.5 17.2 H 74.2 V 21 H 82.5 L 80.5 23.5 H 71.5 V 8.5 Z"
        />

        {/* C (Geometric Octagonal Terminal Cuts) */}
        <path
          d="M 96.5 11.5 L 94.5 9.2 L 89 8.5 H 87.5 L 84.5 11.5 V 20.5 L 87.5 23.5 H 93.5 L 96.5 20.5 L 94.5 18.5 L 92.5 20.8 H 88 L 86.8 19.6 V 12.4 L 88 11.2 H 92.5 L 94.5 13.5 Z"
        />

        {/* T (Sharp Technical Crossbar) */}
        <path
          d="M 99.5 8.5 H 113.5 L 112 11 H 107.8 V 23.5 H 105.1 V 11 H 101 L 99.5 8.5 Z"
        />
      </g>

      {/* ========================================================
          OPTICAL BRIDGE: Precision Technical Micro-Facet
          ======================================================== */}
      <polygon
        points="118.5,16 120,14.5 121.5,16 120,17.5"
        fill={bridgeColor}
        opacity={0.65}
      />

      {/* ========================================================
          PART 2: "VERSE" (Dominant, Bold, Sharp, Futuristic Tech)
          Y: 5.5 to 26.5 (Height 21) | Aerodynamic cuts, dominant presence
          ======================================================== */}
      <g id="pv-wordmark-verse" fill={primaryColor}>
        {/* V (Sharp Futuristic Chevron with Angled Bevel) */}
        <path
          d="M 127 5.5 H 132.2 L 140.5 26.5 H 135.5 L 127 5.5 Z M 154 5.5 H 148.8 L 140.5 26.5 H 145.5 L 154 5.5 Z"
        />

        {/* E (Bold Aerospace-cut E with 45° Chamfered Arm Tips) */}
        <path
          d="M 157 5.5 H 176 L 172 9.5 H 161.2 V 14 H 173.5 L 170 18 H 161.2 V 22.5 H 172 L 176 26.5 H 157 V 5.5 Z"
        />

        {/* R (High-Tech Silhouette with Angled Vector Foot) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 179 5.5 H 195.5 L 200 10 V 13 L 196.5 16.5 L 200 26.5 H 195 L 191.5 17.5 H 183.2 V 26.5 H 179 V 5.5 Z M 183.2 9.5 V 13.8 H 194 L 195.8 12 V 11.3 L 194 9.5 H 183.2 Z"
        />

        {/* S (Futuristic Cyber-Cut S with Diagonal Facets) */}
        <path
          d="M 224 10.5 L 219.8 6.3 H 208 L 204 10.3 V 13.5 L 208 17.5 H 218 L 220 19.5 V 22.5 L 216 26.5 H 205 L 203 21.5 H 207.2 L 208.5 22.5 H 214.8 L 216 21.3 V 20.3 L 213 17.3 H 206 L 204 15.3 V 10.5 L 208 6.5 H 218 L 220 8.5 Z"
        />

        {/* E (Closing Aerospace-cut E) */}
        <path
          d="M 227 5.5 H 246 L 242 9.5 H 231.2 V 14 H 243.5 L 240 18 H 231.2 V 22.5 H 242 L 246 26.5 H 227 V 5.5 Z"
        />
      </g>
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98, x: -4 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center group"
      >
        <div
          className={`transition-all duration-200 ease-out ${
            interactiveHover ? 'group-hover:translate-x-0.5 group-hover:opacity-90' : ''
          }`}
        >
          {svgContent}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="inline-flex items-center group">
      <div
        className={`transition-all duration-200 ease-out ${
          interactiveHover ? 'group-hover:translate-x-0.5 group-hover:opacity-90' : ''
        }`}
      >
        {svgContent}
      </div>
    </div>
  );
};

export default ProjectVerseWordmark;
