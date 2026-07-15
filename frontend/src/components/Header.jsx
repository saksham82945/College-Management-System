import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { useNotifications } from '@/hooks/useNotifications';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, Sun, Moon, LogOut, User, Settings, ChevronDown,
    CheckCheck, Trash2, Info, AlertTriangle, CheckCircle, X,
    ArrowRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate as useNav } from 'react-router-dom';

// ── Notification icon by type ─────────────────────────────────────────────────
const NotifIcon = ({ type }) => {
    const map = {
        info:    { icon: Info,          color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'    },
        warning: { icon: AlertTriangle, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30' },
        success: { icon: CheckCircle,   color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' },
        error:   { icon: AlertTriangle, color: 'text-red-500 bg-red-50 dark:bg-red-900/30'       },
    };
    const { icon: Icon, color } = map[type] || map.info;
    return (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color}`}>
            <Icon size={14} />
        </div>
    );
};

// ── Notification Dropdown ─────────────────────────────────────────────────────
const NotificationDropdown = ({ onClose }) => {
    const navigate = useNavigate();
    const { notifications, unreadCount, isLoading, markRead, markAllRead, deleteNotification } = useNotifications();
    const recent = notifications.slice(0, 6);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 mt-3 w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                <div className="flex items-center gap-2">
                    <Bell size={16} className="text-primary" />
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-black bg-primary text-white rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={() => markAllRead()}
                            className="flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                        >
                            <CheckCheck size={13} /> Mark all read
                        </button>
                    )}
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600">
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Notification list */}
            <div className="max-h-[340px] overflow-y-auto custom-scrollbar">
                {isLoading ? (
                    <div className="flex flex-col gap-3 p-5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-3 animate-pulse">
                                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : recent.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
                        <Bell size={32} className="opacity-30" />
                        <p className="text-sm font-medium">You're all caught up!</p>
                    </div>
                ) : (
                    <div className="p-2 space-y-1">
                        {recent.map((notif) => (
                            <motion.div
                                key={notif._id}
                                layout
                                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer group transition-colors
                                    ${notif.isRead
                                        ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                        : 'bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/15'
                                    }`}
                                onClick={() => !notif.isRead && markRead(notif._id)}
                            >
                                <NotifIcon type={notif.type} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className={`text-xs font-bold truncate ${notif.isRead ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                                            {notif.title}
                                        </p>
                                        {!notif.isRead && (
                                            <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                                        {notif.message}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        {notif.createdAt
                                            ? formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })
                                            : ''}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteNotification(notif._id); }}
                                    className="p-1 rounded-lg opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shrink-0"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/20">
                <button
                    onClick={() => { navigate('/notifications'); onClose(); }}
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold text-primary hover:underline"
                >
                    View all notifications <ArrowRight size={13} />
                </button>
            </div>
        </motion.div>
    );
};

// ── Main Header ───────────────────────────────────────────────────────────────
export const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { unreadCount } = useNotifications();

    // Close notification dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-30 w-full h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 transition-colors duration-300">
            <div className="flex justify-between items-center h-full px-6">
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Dashboard Overview</h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
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

                    {/* Notifications Bell */}
                    <div className="relative" ref={notifRef}>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => { setIsNotifOpen(v => !v); setIsProfileOpen(false); }}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative"
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950"
                                >
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </motion.span>
                            )}
                        </motion.button>

                        <AnimatePresence>
                            {isNotifOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                                    <div className="relative z-50">
                                        <NotificationDropdown onClose={() => setIsNotifOpen(false)} />
                                    </div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />

                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
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
                                            <button
                                                onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                            >
                                                <Settings size={16} /> Settings
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
