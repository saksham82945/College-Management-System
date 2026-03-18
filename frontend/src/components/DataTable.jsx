import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Loader2, Database, SearchX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DataTable = ({
    columns,
    data,
    loading,
    emptyIcon: EmptyIcon,
    emptyTitle = "No data found",
    emptyDescription = "There are no records to display.",
    onRowClick,
    tableContainerClassName = "",
    headerClassName = "",
    rowClassName = "",
}) => {
    const { isDarkMode } = useTheme();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
                    <div className="absolute inset-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">Synchronizing</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Accessing Ledger Data...</span>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-6 py-20 text-center flex flex-col items-center justify-center gap-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
            >
                <div className={`p-8 rounded-[2rem] ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-2xl shadow-black/40' : 'bg-slate-50 border-slate-100'} border-2 relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {EmptyIcon ? <EmptyIcon size={48} className="text-primary/40" /> : <SearchX size={48} className="text-primary/40" />}
                </div>
                <div className="max-w-xs">
                    <h3 className={`font-black uppercase tracking-widest text-sm mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{emptyTitle}</h3>
                    <p className="text-xs font-bold opacity-60 leading-relaxed uppercase tracking-tighter">{emptyDescription}</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className={`overflow-x-auto custom-scrollbar ${tableContainerClassName}`}>
            <table className="w-full text-left border-separate border-spacing-y-2 px-4">
                <thead className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-400' : 'text-slate-400'} ${headerClassName}`}>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={col.key || index} className={`px-6 py-4 font-black ${col.headerClassName || ''}`}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="overflow-visible">
                    {data.map((row, rowIndex) => (
                        <motion.tr
                            key={row.id || row._id || rowIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: rowIndex * 0.03 }}
                            onClick={() => onRowClick && onRowClick(row)}
                            className={`
                                group transition-all duration-300
                                ${isDarkMode 
                                    ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/50 text-slate-300' 
                                    : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-600'
                                } 
                                border-2 rounded-2xl
                                ${onRowClick ? 'cursor-pointer' : ''}
                                shadow-sm hover:shadow-xl hover:shadow-primary/5
                                ${rowClassName}
                            `}
                        >
                            {columns.map((col, colIndex) => (
                                <td 
                                    key={col.key || colIndex} 
                                    className={`
                                        px-6 py-5 first:rounded-l-[1.5rem] last:rounded-r-[1.5rem]
                                        border-t-2 border-b-2 first:border-l-2 last:border-r-2
                                        ${isDarkMode ? 'border-transparent group-hover:border-slate-700/50' : 'border-transparent group-hover:border-slate-200'}
                                        ${col.cellClassName || ''}
                                    `}
                                >
                                    <div className="relative z-10">
                                        {col.render ? col.render(row[col.key], row, rowIndex) : (
                                            <span className="font-bold text-sm tracking-tight">{row[col.key]}</span>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

