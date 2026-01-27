import React, { ReactNode } from 'react';
import { useThemeStore } from '@/store/theme';

interface FormSectionProps {
    title: string;
    children: ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
    const { isDarkMode } = useThemeStore();

    const sectionClasses = `p-6 rounded-lg shadow-sm border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
        }`;

    const headerClasses = `text-lg font-semibold mb-4 border-b pb-2 ${isDarkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-100'
        }`;

    return (
        <div className={sectionClasses}>
            <h2 className={headerClasses}>{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
        </div>
    );
};
