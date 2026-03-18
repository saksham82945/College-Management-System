import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    children, 
    disabled, 
    className, 
    icon: Icon,
    ...props 
}) => {
    const baseStyles = 'relative inline-flex items-center justify-center font-black uppercase tracking-widest transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden';
    
    const variantStyles = {
        primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 rounded-2xl',
        secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl',
        danger: 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 rounded-2xl',
        outline: 'border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary rounded-2xl',
        glass: 'glass-card border border-white/20 text-white hover:bg-white/20 rounded-2xl',
        ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl',
    };

    const sizeStyles = {
        xs: 'px-3 py-1.5 text-[10px] gap-1.5',
        sm: 'px-4 py-2 text-[11px] gap-2',
        md: 'px-6 py-3 text-xs gap-2.5',
        lg: 'px-8 py-4 text-sm gap-3',
        icon: 'p-2.5 rounded-xl',
    };

    return (
        <motion.button
            whileHover={!disabled && !isLoading ? { y: -2, scale: 1.02 } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer duration-1000" />
            
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                    >
                        <Loader2 size={16} className="animate-spin" />
                        <span className="hidden sm:inline">Executing...</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 w-full"
                    >
                        {Icon && <Icon size={size === 'sm' || size === 'xs' ? 14 : 18} className="shrink-0" />}
                        {children && <span>{children}</span>}
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Active Glow for primary */}
            {variant === 'primary' && (
                <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-[2rem]" />
            )}
        </motion.button>
    );
};
