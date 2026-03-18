import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export const PageHeader = ({ title, subtitle, icon: Icon, gradient, backTo, actions }) => {
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();

    const handleBack = () => {
        if (backTo) navigate(backTo);
        else navigate(-1);
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 relative">
            <div className="flex items-start gap-6">
                {/* Back Button - Glassmorphic */}
                <motion.button
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    className="mt-1 flex items-center justify-center w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-500 hover:text-primary transition-all shadow-sm hover:shadow-primary/10"
                    title="Navigate Back"
                >
                    <ChevronLeft size={24} />
                </motion.button>

                {/* Title Area */}
                <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                        {Icon && (
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${roleTheme || 'from-primary to-primary-dark'} bg-clip-text text-transparent opacity-80`}>
                                <Icon size={16} />
                            </div>
                        )}
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">Institutional Registry</span>
                    </div>
                    
                    <h1 className={`text-4xl md:text-5xl font-black tracking-tighter transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {title}
                    </h1>
                    
                    {subtitle && (
                        <div className="flex items-center gap-2 pl-1">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <p className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500 opacity-60'}`}>
                                {subtitle}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions Area */}
            {actions && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 shrink-0 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0"
                >
                    {actions}
                </motion.div>
            )}

            {/* Decorative Element */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
        </div>
    );
};

