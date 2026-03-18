import React from 'react';
import { motion } from 'framer-motion';

export const QuickAction = ({ label, icon: Icon, color, onClick }) => (
    <motion.button
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="glass-card flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 transition-all group overflow-hidden relative"
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg shadow-current/20 mb-1`}>
            <Icon size={24} />
        </div>
        
        <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest text-center group-hover:text-primary transition-colors">
            {label}
        </span>
        
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r ${color} rounded-t-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`} />
    </motion.button>
);

