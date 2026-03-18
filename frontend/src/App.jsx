import React, { useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';
import { routes } from '@/config/routes';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        }
    }
});

import { ThemeProvider } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

const AppRoutes = () => {
    const routing = useRoutes(routes);
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, scale: 0.99, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.01, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                {routing}
            </motion.div>
        </AnimatePresence>
    );
};

const Spinner = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-slate-950 gap-6">
        <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-primary/10 rounded-[2rem] animate-pulse"></div>
            <div className="absolute inset-0 border-t-4 border-primary rounded-[2rem] animate-spin-slow"></div>
        </div>
        <div className="text-center">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 animate-pulse">Initializing Interface</p>
        </div>
    </div>
);

function App() {
    const { hydrate, isInitialized } = useAuthStore();
    useEffect(() => {
        hydrate();
    }, [hydrate]);

    if (!isInitialized) return <Spinner />;

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Router>
                    <ErrorBoundary>
                        <React.Suspense fallback={<Spinner />}>
                            <AppRoutes />
                        </React.Suspense>
                    </ErrorBoundary>
                </Router>
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            borderRadius: '24px',
                            fontWeight: 700,
                            fontSize: '13px',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                            border: '1px solid var(--border)',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                            padding: '16px 24px',
                        },
                    }}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
}


export default App;
