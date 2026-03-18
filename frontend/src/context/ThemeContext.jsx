import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
  roleTheme: '',
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const { user } = useAuthStore();
  const [roleTheme, setRoleTheme] = useState('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!user) {
      setRoleTheme('');
      return;
    }

    const role = user.roles?.[0] || user.role;
    switch (role?.toUpperCase()) {
      case 'ADMIN':
        setRoleTheme('role-admin');
        break;
      case 'TEACHER':
        setRoleTheme('role-teacher');
        break;
      case 'STUDENT':
        setRoleTheme('role-student');
        break;
      default:
        setRoleTheme('');
    }
  }, [user]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, roleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
