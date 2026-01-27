import axios from 'axios';
import { API_BASE_URL } from './API_BASE_URL';
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Handle token refresh on 401
apiClient.interceptors.response.use((response) => response, async (error) => {
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
});
export default apiClient;
