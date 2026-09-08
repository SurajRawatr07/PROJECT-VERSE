import React from 'react';
import { ProjectVerseWordmark } from './ProjectVerseWordmark';

export interface ProjectVerseBrandProps {
  /** Height in pixels. Default adapts responsively (24-28px) */
  logoSize?: number;
  /** Custom class for the container */
  className?: string;
  /** Color theme: 'light' (dark wordmark) or 'dark' (white wordmark) */
  theme?: 'light' | 'dark';
  /** Compatibility prop */
  variant?: 'full' | 'logo-only' | 'wordmark-only';
  /** Collapsed sidebar mode */
  collapsed?: boolean;
  /** Custom text sizing class */
  textSizeClassName?: string;
  /** Whether to apply interactive hover transitions */
  interactive?: boolean;
}

/**
 * Premium PROJECT VERSE Brand Identity Component
 * 
 * Uses the custom futuristic, geometric SVG wordmark identity.
 */
export const ProjectVerseBrand: React.FC<ProjectVerseBrandProps> = ({
  logoSize = 26,
  className = '',
  theme = 'light',
  interactive = true,
}) => {
  return (
    <div
      className={`inline-flex items-center select-none whitespace-nowrap align-middle ${className}`}
    >
      <ProjectVerseWordmark
        height={logoSize}
        theme={theme}
        interactiveHover={interactive}
        animated={false}
      />
    </div>
  );
};

export default ProjectVerseBrand;
