import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, ChevronRight, Menu, Home, LogOut, Users, 
    GraduationCap, Calculator, ClipboardCheck, FileText, 
    Settings, Briefcase, LayoutDashboard, CreditCard, 
    PieChart, UserCircle, CheckSquare, Sparkles, ChevronLeft
} from 'lucide-react';

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState(['FACULTY & STAFF']);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();
    const { isDarkMode, roleTheme } = useTheme();

    const menuItems = {
        ADMIN: [
            { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
            { label: 'Students', path: '/students', icon: GraduationCap },
            {
                label: 'Faculty & Staff',
                icon: UserCircle,
                children: [
                    { label: 'Faculty', path: '/teachers', icon: Users },
                    { label: 'Staff', path: '/staff', icon: Briefcase },
                ]
            },
            { label: 'Courses', path: '/classes', icon: ClipboardCheck },
            { label: 'Attendance', path: '/attendance', icon: CheckSquare },
            { label: 'Fees', path: '/fees', icon: CreditCard },
            { label: 'Exams', path: '/exams', icon: FileText },
            { label: 'Timetable', path: '/timetable', icon: Calculator },
            { label: 'Payroll', path: '/payroll', icon: PieChart },
            { label: 'Settings', path: '/settings', icon: Settings },
        ],
        STUDENT: [
            { label: 'My Dashboard', path: '/student-dashboard', icon: LayoutDashboard },
            { label: 'My Timetable', path: '/timetable', icon: Calculator },
            { label: 'Exams', path: '/exams', icon: FileText },
            { label: 'Grades', path: '/grades', icon: GraduationCap },
            { label: 'Settings', path: '/settings', icon: Settings },
        ],
        TEACHER: [
            { label: 'My Dashboard', path: '/teacher-dashboard', icon: LayoutDashboard },
            { label: 'Students', path: '/students', icon: GraduationCap },
            { label: 'Attendance', path: '/attendance', icon: CheckSquare },
            { label: 'Exams', path: '/exams', icon: FileText },
            { label: 'Timetable', path: '/timetable', icon: Calculator },
            { label: 'Settings', path: '/settings', icon: Settings },
        ],
    };

    const currentRole = user?.roles?.[0]?.toUpperCase() || 'STUDENT';
    const items = menuItems[currentRole] || menuItems['STUDENT'];

    const toggleMenu = (label) => {
        setExpandedMenus(prev => prev.includes(label.toUpperCase())
            ? prev.filter(item => item !== label.toUpperCase())
            : [...prev, label.toUpperCase()]);
    };

    const isActive = (path) => location.pathname === path;

    const renderMenuItem = (item, depth = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isMenuExpanded = expandedMenus.includes(item.label.toUpperCase());
        const active = item.path ? isActive(item.path) : false;

        return (
            <div key={item.label} className="mb-1">
                <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => hasChildren ? toggleMenu(item.label) : navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group
                        ${active 
                            ? `bg-gradient-to-r ${roleTheme} text-white shadow-lg shadow-primary/20` 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                        }
                        ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
                    `}
                >
                    <item.icon size={20} className={`shrink-0 ${active ? 'text-white' : ''}`} />
                    
                    {!collapsed && (
                        <span className="flex-1 text-left text-sm font-bold tracking-tight truncate">
                            {item.label}
                        </span>
                    )}

                    {!collapsed && hasChildren && (
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isMenuExpanded ? 'rotate-180' : ''}`} />
                    )}

                    {collapsed && active && (
                        <motion.div layoutId="activePill" className="absolute -left-4 w-1.5 h-8 bg-primary rounded-r-full" />
                    )}
                </motion.button>

                <AnimatePresence>
                    {!collapsed && hasChildren && isMenuExpanded && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-6 mt-1 border-l-2 border-slate-100 dark:border-slate-800 space-y-1"
                        >
                            {item.children.map(child => (
                                <button
                                    key={child.path}
                                    onClick={() => navigate(child.path)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-lg transition-all
                                        ${isActive(child.path)
                                            ? 'text-primary'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }
                                    `}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${isActive(child.path) ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`} />
                                    {child.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <motion.aside 
            initial={false}
            animate={{ width: collapsed ? 80 : 280 }}
            className={`sticky top-0 h-screen z-40 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 transition-colors duration-300 shadow-xl overflow-hidden`}
        >
            {/* Logo Section */}
            <div className="p-6 h-20 flex items-center justify-between">
                <AnimatePresence mode="wait">
                    {!collapsed && (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3"
                        >
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${roleTheme} flex items-center justify-center text-white shadow-lg`}>
                                <Sparkles size={20} />
                            </div>
                            <h1 className="text-lg font-black tracking-tighter text-slate-900 dark:text-white">
                                LNMI<span className="text-primary">CMS</span>
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <button 
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-all shadow-sm"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Menu Section */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2">
                {!collapsed && (
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4 ml-2">
                        Main Menu
                    </p>
                )}
                {items.map(item => renderMenuItem(item))}
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                    onClick={() => navigate('/')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all mb-1
                        ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
                    `}
                >
                    <Home size={20} />
                    {!collapsed && <span className="text-sm font-bold tracking-tight">Main Site</span>}
                </button>
                <button 
                    onClick={() => { logout(); navigate('/login'); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-danger/10 transition-all
                        ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
                    `}
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="text-sm font-bold tracking-tight">Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    );
};

