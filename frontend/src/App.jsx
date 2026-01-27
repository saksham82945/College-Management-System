import React, { useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';
import { routes } from '@/config/routes';
const queryClient = new QueryClient();
const AppRoutes = () => {
    const routing = useRoutes(routes);
    return routing;
};
function App() {
    const { hydrate, isInitialized } = useAuthStore();
    useEffect(() => {
        hydrate();
    }, [hydrate]);
    if (!isInitialized) {
        return (<div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>);
    }
    return (<QueryClientProvider client={queryClient}>
      <Router>
        <React.Suspense fallback={<div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>}>
          <AppRoutes />
        </React.Suspense>
      </Router>
      <Toaster position="top-right"/>
    </QueryClientProvider>);
}
export default App;
