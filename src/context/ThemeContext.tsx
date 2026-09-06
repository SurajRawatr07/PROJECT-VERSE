import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

export type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always lock to single consistent clean light theme
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.removeItem('projectverse_theme');
      } catch {
        // Storage unavailable
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      theme: 'light' as Theme,
      isDark: false,
      toggleTheme: () => {},
      setTheme: () => {},
    }),
    []
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
