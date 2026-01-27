import React from 'react';
import { useThemeStore } from '@/store/theme';
import { Loader2 } from 'lucide-react';

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
    const { isDarkMode } = useThemeStore();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Loader2 size={28} className="animate-spin text-indigo-500 mb-3" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading data...</span>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className={`px-6 py-12 text-center flex flex-col items-center justify-center gap-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {EmptyIcon && (
                    <div className={`p-4 rounded-full mb-2 ${isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                        <EmptyIcon size={32} />
                    </div>
                )}
                <div>
                    <h3 className={`font-semibold text-base mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{emptyTitle}</h3>
                    <p className="text-sm opacity-80">{emptyDescription}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`overflow-x-auto ${tableContainerClassName}`}>
            <table className="w-full text-sm text-left">
                <thead className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'bg-gray-900/40 text-gray-400' : 'bg-gray-50 text-gray-500'} ${headerClassName}`}>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={col.key || index} className={`px-6 py-3.5 ${col.headerClassName || ''}`}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700/60' : 'divide-gray-100'}`}>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={row.id || row._id || rowIndex}
                            onClick={() => onRowClick && onRowClick(row)}
                            className={`transition-colors duration-150 
                                ${isDarkMode ? 'hover:bg-gray-700/40' : 'hover:bg-gray-50/80'} 
                                ${onRowClick ? 'cursor-pointer' : ''}
                                ${rowClassName}
                            `}
                        >
                            {columns.map((col, colIndex) => (
                                <td key={col.key || colIndex} className={`px-6 py-4 ${col.cellClassName || ''}`}>
                                    {col.render ? col.render(row, rowIndex) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
