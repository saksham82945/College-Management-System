import React from 'react';
import { useThemeStore } from '@/store/theme';

interface FormFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    type?: 'text' | 'email' | 'password' | 'tel' | 'date' | 'number';
    required?: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
    as?: 'input' | 'select' | 'textarea';
    rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    value,
    onChange,
    type = 'text',
    required = false,
    placeholder,
    options,
    as = 'input',
    rows = 3
}) => {
    const { isDarkMode } = useThemeStore();

    const inputClasses = `w-full p-2 border rounded focus:ring-2 transition-all ${isDarkMode
            ? 'bg-gray-800 border-gray-700 text-white focus:ring-purple-500/50'
            : 'bg-white border-gray-200 text-gray-900 focus:ring-purple-500/20 focus:border-purple-500'
        }`;

    const labelClasses = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`;

    return (
        <div>
            <label className={labelClasses}>{label}</label>
            {as === 'select' && options ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={inputClasses}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : as === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    rows={rows}
                    className={inputClasses}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className={inputClasses}
                />
            )}
        </div>
    );
};
