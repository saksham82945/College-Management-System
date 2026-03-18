import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Input } from './Input';

export const FormField = ({ 
    label, 
    name, 
    value, 
    onChange, 
    type = 'text', 
    required = false, 
    placeholder, 
    options, 
    as = 'input', 
    rows = 3,
    icon: Icon,
    helperText
}) => {
    const { isDarkMode } = useTheme();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {label} {required && <span className="text-secondary ml-1">*</span>}
                </label>
                {helperText && (
                    <span className="text-[9px] font-bold text-slate-400 italic">{helperText}</span>
                )}
            </div>

            {as === 'select' && options ? (
                <div className="relative group">
                    <select 
                        name={name} 
                        value={value} 
                        onChange={onChange} 
                        required={required}
                        className={`w-full px-5 py-3.5 rounded-2xl border transition-all duration-300 outline-none appearance-none font-bold text-sm
                            ${isDarkMode 
                                ? 'bg-slate-900 border-slate-800 text-white focus:border-primary focus:ring-4 focus:ring-primary/10' 
                                : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm'}`}
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            ) : as === 'textarea' ? (
                <textarea 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    required={required} 
                    placeholder={placeholder} 
                    rows={rows} 
                    className={`w-full px-5 py-4 rounded-[1.5rem] border transition-all duration-300 outline-none font-bold text-sm min-h-[120px] resize-none
                        ${isDarkMode 
                            ? 'bg-slate-900 border-slate-800 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm placeholder:text-slate-400'}`}
                />
            ) : (
                <Input 
                    type={type} 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    required={required} 
                    placeholder={placeholder} 
                    icon={Icon}
                />
            )}
        </div>
    );
};
