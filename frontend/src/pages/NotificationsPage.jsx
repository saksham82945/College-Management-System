import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle, Filter, Search } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow, format } from 'date-fns';
import toast from 'react-hot-toast';

const FILTERS = ['All', 'Unread', 'Read'];

const typeConfig = {
    info:    { icon: Info,          bg: 'bg-blue-50 dark:bg-blue-900/20',    text: 'text-blue-600 dark:text-blue-400',    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'    },
    warning: { icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-900/20',  text: 'text-amber-600 dark:text-amber-400',  badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'  },
    success: { icon: CheckCircle,   bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
    error:   { icon: AlertTriangle, bg: 'bg-red-50 dark:bg-red-900/20',      text: 'text-red-600 dark:text-red-400',      badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'      },
};

export function NotificationsPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [search, setSearch] = useState('');
    const { notifications, unreadCount, isLoading, markRead, markAllRead, deleteNotification } = useNotifications();

    const filtered = notifications.filter(n => {
        const matchesFilter =
            activeFilter === 'All' ||
            (activeFilter === 'Unread' && !n.isRead) ||
            (activeFilter === 'Read' && n.isRead);
        const matchesSearch =
            !search ||
            n.title?.toLowerCase().includes(search.toLowerCase()) ||
            n.message?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleMarkAll = () => {
        markAllRead();
        toast.success('All notifications marked as read');
    };

    const handleDelete = (id) => {
        deleteNotification(id);
        toast.success('Notification deleted');
    };

    const handleMarkRead = (id, isRead) => {
        if (!isRead) {
            markRead(id);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                            <Bell size={20} className="text-white" />
                        </div>
                        Notifications
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-13">
                        {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You\'re all caught up!'}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={handleMarkAll}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-sm rounded-xl transition-colors"
                    >
                        <CheckCheck size={16} />
                        Mark all as read
                    </button>
                )}
            </div>

            {/* Search + Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search notifications..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                    />
                </div>
                {/* Filter Tabs */}
                <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                activeFilter === f
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            {f}
                            {f === 'Unread' && unreadCount > 0 && (
                                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-primary text-white rounded-full">{unreadCount}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notification List */}
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex gap-4 p-5 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 animate-pulse">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-2/3" />
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400"
                >
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Bell size={28} className="opacity-40" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-slate-600 dark:text-slate-300">
                            {search ? 'No matching notifications' : 'No notifications here'}
                        </p>
                        <p className="text-sm mt-1">
                            {search ? 'Try a different search term' : 'You\'re all caught up! 🎉'}
                        </p>
                    </div>
                </motion.div>
            ) : (
                <AnimatePresence mode="popLayout">
                    <div className="space-y-2">
                        {filtered.map((notif, idx) => {
                            const cfg = typeConfig[notif.type] || typeConfig.info;
                            const Icon = cfg.icon;
                            return (
                                <motion.div
                                    key={notif._id}
                                    layout
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    onClick={() => handleMarkRead(notif._id, notif.isRead)}
                                    className={`group flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                                        notif.isRead
                                            ? 'bg-white dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                                            : 'bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/15'
                                    }`}
                                >
                                    {/* Icon */}
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                                        <Icon size={18} className={cfg.text} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className={`text-sm font-bold ${notif.isRead ? 'text-slate-700 dark:text-slate-200' : 'text-slate-900 dark:text-white'}`}>
                                                        {notif.title}
                                                    </p>
                                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${cfg.badge}`}>
                                                        {notif.type || 'info'}
                                                    </span>
                                                    {!notif.isRead && (
                                                        <span className="w-2 h-2 bg-primary rounded-full" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                                    {notif.message}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-2">
                                                    {notif.createdAt
                                                        ? `${formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })} · ${format(new Date(notif.createdAt), 'MMM d, yyyy h:mm a')}`
                                                        : ''}
                                                </p>
                                            </div>
                                            {/* Actions */}
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                {!notif.isRead && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); markRead(notif._id); }}
                                                        title="Mark as read"
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                                                    >
                                                        <CheckCheck size={14} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(notif._id); }}
                                                    title="Delete"
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </AnimatePresence>
            )}
        </div>
    );
}
