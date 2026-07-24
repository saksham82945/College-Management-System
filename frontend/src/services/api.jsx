import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from './API_BASE_URL';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token and cache busting to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Prevent browser caching for GET requests to ensure real-time updates
    if (config.method === 'get') {
        config.params = {
            ...config.params,
            _t: Date.now()
        };
    }
    
    return config;
});

// Handle token refresh on 401 and network connection errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle connection/network errors
        if (!error.response || error.message === 'Network Error') {
            toast.error((t) => (
                <div className="flex flex-col gap-2 py-1">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">Server Offline or Starting Up</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        Unable to connect to the backend server. The database or server might be waking up (usually takes 30-50s on free hosting).
                    </p>
                    <div className="flex justify-end gap-2 mt-1">
                        <button
                            onClick={() => {
                                toast.dismiss(t.id);
                                window.location.reload();
                            }}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] font-black uppercase tracking-wider rounded-lg transition-all"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            ), {
                id: 'network-connection-error',
                duration: 8000,
            });
        }

        if (error.response?.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const response = await apiClient.post('/auth/refresh', { refreshToken });
                    localStorage.setItem('accessToken', response.data.data.tokens.accessToken);
                    localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken);
                    return apiClient(error.config);
                }
                catch {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/'; // Force redirect to login
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
