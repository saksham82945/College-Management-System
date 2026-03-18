import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sun, Moon, LogOut, User, Settings, ChevronDown } from 'lucide-react';

export const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-30 w-full h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 transition-colors duration-300">
            <div className="flex justify-between items-center h-full px-6">
                <div className="flex items-center gap-4">
                    {/* Placeholder for page title or search if needed later */}
                    <div className="hidden md:block">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Dashboard Overview</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <motion.button
                        whileTap={{ rotate: 180, scale: 0.8 }}
                        onClick={toggleDarkMode}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative group"
                    >
                        {isDarkMode ? (
                            <Sun size={20} className="text-amber-400" />
                        ) : (
                            <Moon size={20} className="text-indigo-600" />
                        )}
                        <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </motion.button>

                    {/* Notifications */}
                    <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative group">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-white dark:border-slate-900"></span>
                        <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Notifications
                        </span>
                    </button>

                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />

                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1 pl-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mb-1">
                                    {user?.fullName?.split(' ')[0] || 'User'}
                                </p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                    {user?.roles?.[0] || 'Member'}
                                </p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-md overflow-hidden border-2 border-white dark:border-slate-800">
                                {user?.fullName?.[0] || 'U'}
                            </div>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-56 glass-card rounded-2xl overflow-hidden z-50 shadow-2xl"
                                    >
                                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.fullName}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                <User size={16} /> My Profile
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                <Settings size={16} /> settings
                                            </button>
                                        </div>
                                        <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10">
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-danger hover:bg-danger/10 rounded-lg transition-colors"
                                            >
                                                <LogOut size={16} /> Sign out
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
};

