import React from 'react';
import { Plus } from 'lucide-react';
import { useThemeStore } from '@/store/theme';
export const PageHeader = ({ title, subtitle, actionLabel, onAction, children }) => {
    const { isDarkMode } = useThemeStore();
    return (<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {title}
                </h1>
                {subtitle && (<p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {subtitle}
                    </p>)}
            </div>
            <div className="flex gap-2">
                {children}
                {actionLabel && onAction && (<button onClick={onAction} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md">
                        <Plus size={18}/>
                        {actionLabel}
                    </button>)}
            </div>
        </div>);
};
