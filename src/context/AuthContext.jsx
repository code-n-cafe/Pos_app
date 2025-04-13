import { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Add this import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    const login = (userData, token) => {
        try {
            const decoded = jwtDecode(token); // Use jwtDecode instead of jwt
            if (decoded.exp < Date.now()/1000) {
                throw new Error('Token expired');
            }
            
            localStorage.setItem('authToken', token);
            setUser(userData);
        } catch (err) {
            console.error('Login error:', err);
            logout();
        }
    };

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Verify token validity
                const decoded = jwtDecode(token);
                if (decoded.exp < Date.now()/1000) {
                    throw new Error('Token expired');
                }

                const response = await fetch('/api/customers/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('authToken');
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user,
            loading,
            login,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);