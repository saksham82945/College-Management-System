import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
export const Layout = ({ children }) => {
    return (<div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
          <div className="p-6 text-slate-900 dark:text-slate-100">{children}</div>
        </main>
      </div>
    </div>);
};
