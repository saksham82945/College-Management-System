import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ title, value, icon: Icon, color, bg, isDarkMode, layout = 'vertical' }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    if (layout === 'horizontal') {
        const cardClass = `rounded-2xl border p-6 ${bg} flex items-center gap-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`;
        return (
            <div className={cardClass}>
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                    <Icon size={20} className={color} />
                </div>
                <div>
                    <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
                </div>
            </div>
        );
    }

    // Default Vertical (used in Admin)
    return (
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className={`p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 shadow-lg' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : bg}`}>
                    <Icon size={22} className={color} />
                </div>
            </div>
            <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        </motion.div>
    );
};
