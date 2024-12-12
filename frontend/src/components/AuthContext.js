// src/components/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import keycloak from '../Keycloak';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [keycloakInstance, setKeycloakInstance] = useState(null);

    useEffect(() => {
        // Inicjalizuj Keycloak bez automatycznego logowania
        setKeycloakInstance(keycloak);
    }, []);

    const login = () => {
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            setIsAuthenticated(authenticated);
        }).catch(err => {
            console.error("Keycloak initialization failed:", err);
        });
    };

    const logout = () => {
        keycloak.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, keycloakInstance }}>
            {children}
        </AuthContext.Provider>
    );
};
