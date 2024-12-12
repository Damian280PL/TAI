import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Pobranie instancji Keycloaka z kontekstu

const Logout = () => {
    const navigate = useNavigate();
    const { keycloak } = useAuth(); // Pobieramy Keycloak z kontekstu

    useEffect(() => {
        const logout = async () => {
            try {
                if (keycloak) {
                    // Wylogowanie za pomocą domyślnego endpointu Keycloaka
                    await keycloak.logout({
                        redirectUri: window.location.origin + '/login', // Po wylogowaniu przekierowanie na login
                    });
                } else {
                    console.error("Brak instancji Keycloaka");
                    navigate('/login');
                }
            } catch (err) {
                console.error("Błąd podczas wylogowania:", err);
                navigate('/login'); // Przekierowanie na login w przypadku błędu
            }
        };

        logout();
    }, [keycloak, navigate]);

    return <p>Wylogowywanie...</p>;
};

export default Logout;
