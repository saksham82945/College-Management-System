import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }
    if (allowedRoles && user && user.roles) {
        const hasPermission = user.roles.some(role => allowedRoles.some(allowed => allowed.toUpperCase() === role.toUpperCase()));
        if (!hasPermission) {
            // toast.error('Access denied'); // Can be annoying on redirect
            return <Navigate to="/dashboard" replace/>;
        }
    }
    return <>{children}</>;
};
