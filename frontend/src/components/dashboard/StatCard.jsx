import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export const StatCard = ({ title, value, icon: Icon, color, bg, trend }) => {
    const { isDarkMode } = useTheme();

    return (
        <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`p-7 rounded-[2.5rem] relative overflow-hidden group border transition-all duration-500
                ${isDarkMode 
                    ? 'bg-slate-900/60 border-slate-800 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:bg-slate-900 shadow-black/40' 
                    : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300'}`}
        >
            {/* Dynamic Ambient Light */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-1000 ${bg}`} />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:rotate-12 ${bg} ${color}`}>
                        <Icon size={28} />
                    </div>
                    {trend !== undefined && (
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5
                                ${trend > 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${trend > 0 ? 'bg-success' : 'bg-danger'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${trend > 0 ? 'bg-success' : 'bg-danger'}`}></span>
                            </span>
                            {trend > 0 ? '+' : ''}{trend}%
                        </motion.div>
                    )}
                </div>
                
                <div className="space-y-1">
                    <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500
                        ${isDarkMode ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-400 group-hover:text-slate-500'}`}>
                        {title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                        <p className={`text-4xl font-black tracking-tighter transition-all duration-500 group-hover:tracking-tight
                            ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {value}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Interaction Bar */}
            <div className={`absolute bottom-3 right-7 w-8 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 ${bg}`} />
        </motion.div>
    );
};


