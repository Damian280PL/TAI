import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                
                await axios.get('https://localhost:7042/Account/Logout', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                
                
                localStorage.removeItem('authToken');
                
                
                navigate('/login');
            } catch (err) {
                console.error("Błąd podczas wylogowania:", err);
            }
        };

        logout();
    }, [navigate]);

    return <p>Wylogowywanie...</p>;
};

export default Logout;
