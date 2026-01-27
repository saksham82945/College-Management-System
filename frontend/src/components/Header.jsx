import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { Menu, X, Bell, Sun, Moon } from 'lucide-react';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`border-b shadow-sm ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center px-6 py-4">
        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>
          College Management
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className={`relative p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {menuOpen && (
              <div className={`absolute right-0 mt-2 w-52 border rounded-xl shadow-xl z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user?.fullName}</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email}</p>
                  {user?.roles?.[0] && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold capitalize">
                      {user.roles[0].toLowerCase()}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-3 text-sm font-medium text-red-600 transition-colors rounded-b-xl ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'}`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
