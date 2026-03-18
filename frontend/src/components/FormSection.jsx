import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export const FormSection = ({ title, children, icon: Icon, description }) => {
    const { isDarkMode } = useTheme();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-[2rem] border transition-all duration-500 glass-card
                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}
        >
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                {Icon && (
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                        <Icon size={24} />
                    </div>
                )}
                <div>
                    <h2 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {title}
                    </h2>
                    {description && (
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{description}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {children}
            </div>
        </motion.div>
    );
};
