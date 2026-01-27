import React from 'react';

export const QuickAction = ({ label, icon: Icon, color, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-gradient-to-br ${color} text-white shadow hover:shadow-lg transition-all hover:scale-105`}
    >
        <Icon size={24} />
        <span className="text-xs font-semibold text-center">{label}</span>
    </button>
);
