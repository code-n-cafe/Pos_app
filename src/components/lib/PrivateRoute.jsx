import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import auth from './auth-helper';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Add a proper loading spinner
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;