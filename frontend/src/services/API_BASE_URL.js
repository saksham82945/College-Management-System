// API Base URL configuration
// In production (Render), VITE_API_URL will be set as environment variable pointing to the backend
// In development, it always uses localhost:5000
export const API_BASE_URL = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL 
    : (import.meta.env.DEV ? 'http://localhost:5000/api/v1' : 'https://college-management-system-backend-e4ki.onrender.com/api/v1');

