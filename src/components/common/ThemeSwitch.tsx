import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeSwitchProps {
  id?: string;
  className?: string;
}

/**
 * ProjectVerse Master Dark / Light Mode Switch
 * 
 * - Unchecked = Light Mode
 * - Checked = Dark Mode
 * - Semantic role="switch", aria-checked, keyboard accessible (Space / Enter)
 * - Tactile physical toggle with smooth transition
 */
export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  id = 'theme-toggle-switch',
  className = '',
}) => {
  const { isDark, toggleTheme } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Dark mode enabled (click for light)' : 'Light mode enabled (click for dark)'}
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 select-none transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] dark:focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0E0E10] ${
        isDark
          ? 'bg-[#27272A] border border-white/20'
          : 'bg-[#E5E5E2] border border-black/10 hover:bg-[#DCDCD8]'
      } ${className}`}
    >
      {/* Visual Thumb Knob */}
      <span
        className={`pointer-events-none inline-flex items-center justify-center h-5 w-5 rounded-full bg-white dark:bg-[#F4F4F5] shadow-xs ring-0 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDark ? 'translate-x-5' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon className="w-2.5 h-2.5 text-[#111111] transition-transform duration-200" />
        ) : (
          <Sun className="w-2.5 h-2.5 text-[#737373] transition-transform duration-200" />
        )}
      </span>
    </button>
  );
};

export default ThemeSwitch;
