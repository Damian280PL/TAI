import React, { createContext, useState, useEffect, useContext } from 'react';
import Keycloak from 'keycloak-js';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const keycloakOptions = {
    url: "http://localhost:8080/",
    realm: "TAI",
    clientId: "dotnet",
  };

  const [keycloak, setKeycloak] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSub, setUserSub] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Admin status

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloakInstance = new Keycloak(keycloakOptions);

      try {
        const authenticated = await keycloakInstance.init({ onLoad: 'login-required' });
        setIsAuthenticated(authenticated);
        setKeycloak(keycloakInstance);

        if (authenticated) {
          // Set the userSub value from the token
          setUserSub(keycloakInstance.tokenParsed?.sub);

          // Check for admin role in token
          const adminRoles = keycloakInstance.tokenParsed?.Admin || [];
          const isAdminRole = adminRoles.includes('Adminuma_authorization'); // Adjust role name if necessary
          setIsAdmin(isAdminRole);

          // Log the full token and parsed token
          console.log("User Token:", keycloakInstance.token);
          console.log("Parsed Token:", keycloakInstance.tokenParsed);
        }
      } catch (error) {
        console.error("Failed to initialize Keycloak:", error);
      }
    };

    initKeycloak();
  }, []);

  return (
    <AuthContext.Provider value={{ keycloak, isAuthenticated, userSub, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
