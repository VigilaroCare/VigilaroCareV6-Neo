import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const lightTheme = {
    background: '#F9FAFB',
    card: '#FFFFFF',
    cardBackground: '#FFFFFF',
    text: '#1F2937',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    subText: '#6B7280',
    primary: '#6200EE',
    primaryGradient: ['#6200EE', '#3700B3'],
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  const darkTheme = {
    background: '#111827',
    card: '#1F2937',
    cardBackground: '#1F2937',
    text: '#F9FAFB',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    subText: '#9CA3AF',
    primary: '#3B82F6',
    primaryGradient: ['#3B82F6', '#2563EB'],
    border: '#374151',
    success: '#34D399',
    warning: '#FBBF24',
    danger: '#F87171',
  };

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);