import React from 'react';
export const Table = ({ columns, data, loading, onRowClick }) => {
    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }
    if (data.length === 0) {
        return <div className="text-center py-8 text-gray-500">No data available</div>;
    }
    return (<div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            {columns.map((col) => (<th key={col.key} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                {col.label}
              </th>))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (<tr key={idx} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick?.(row)}>
              {columns.map((col) => (<td key={col.key} className="px-6 py-3 text-sm text-gray-700">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>))}
            </tr>))}
        </tbody>
      </table>
    </div>);
};
