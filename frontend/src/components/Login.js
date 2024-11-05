// src/components/Login.js
import React from 'react';
import { useAuth } from './useAuth'; // Upewnij się, że to jest poprawny import

const Login = () => {
    const { login } = useAuth(); // Użycie hooka useAuth

    const handleLogin = () => {
        login(); // Funkcja logująca
    };

    return (
        <div>
            <h2>Logowanie</h2>
            <button onClick={handleLogin}>Zaloguj się</button>
        </div>
    );
};

export default Login;
