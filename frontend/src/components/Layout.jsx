import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
export const Layout = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (<div className="flex h-screen overflow-hidden">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header toggleMobileMenu={() => setMobileMenuOpen(prev => !prev)} />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
          <div className="p-4 md:p-6 text-slate-900 dark:text-slate-100">{children}</div>
        </main>
      </div>
    </div>);
};
