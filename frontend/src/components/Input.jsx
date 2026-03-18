import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export const Input = ({ 
    label, 
    error, 
    helperText, 
    className, 
    id, 
    type, 
    icon: Icon,
    ...props 
}) => {
    const { isDarkMode } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`w-full space-y-2 group ${className}`}>
            {label && (
                <label 
                    htmlFor={id} 
                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                        isFocused ? 'text-primary' : (isDarkMode ? 'text-slate-500' : 'text-slate-400')
                    }`}
                >
                    {label}
                </label>
            )}
            
            <div className="relative">
                {Icon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 ${
                        isFocused ? 'text-primary' : (isDarkMode ? 'text-slate-500' : 'text-slate-400')
                    }`}>
                        <Icon size={18} />
                    </div>
                )}
                
                <input
                    id={id}
                    type={inputType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
                        w-full transition-all duration-300 outline-none
                        ${Icon ? 'pl-11' : 'px-5'} 
                        ${isPassword ? 'pr-12' : 'pr-5'}
                        py-3.5 rounded-[1.25rem] text-sm font-bold
                        ${isDarkMode 
                            ? 'bg-slate-900 border-slate-800 text-white focus:border-primary/50 focus:bg-slate-900/50' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-primary/50 focus:bg-white'
                        }
                        border-2
                        placeholder:text-slate-500/50
                        ${error ? '!border-rose-500/50 !bg-rose-500/5' : ''}
                    `}
                    {...props}
                />

                {/* Focus Glow Overlay */}
                <div className={`absolute -inset-0.5 bg-primary/20 rounded-[1.4rem] blur-xl transition-opacity duration-300 pointer-events-none -z-10 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
                        }`}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            <AnimatePresence>
                {error ? (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 mt-1 pl-1"
                    >
                        <AlertCircle size={12} />
                        {error}
                    </motion.p>
                ) : helperText ? (
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 pl-1 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        {helperText}
                    </p>
                ) : null}
            </AnimatePresence>
        </div>
    );
};
