import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Hook do uwierzytelniania

const Navbar = () => {
  const { isAuthenticated, login, keycloak, isAdmin } = useAuth(); // Pobranie danych z kontekstu

  const handleLogin = () => {
    console.log('Login button clicked');
    login(); // Funkcja logowania
  };

  const handleLogout = async () => {
    console.log('Logout button clicked');
    if (keycloak) {
      try {
        // Wylogowanie z Keycloak
        await keycloak.logout({
          redirectUri: window.location.origin + '/login', // Przekierowanie na stronę logowania po wylogowaniu
        });
      } catch (err) {
        console.error('Błąd podczas wylogowywania:', err);
      }
    } else {
      console.error('Brak instancji Keycloak');
    }
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '1rem' }}>
          <Link to="/">Strona główna</Link>
        </li> 
        {isAuthenticated && isAdmin && (
          <li style={{ marginRight: '1rem' }}>
            <Link to="/add-car">Dodaj samochód</Link>
          </li>
        )}
           {isAuthenticated && isAdmin && (
          <li style={{ marginRight: '1rem' }}>
            <Link to="/orders">Zamówienia</Link>
          </li>
        )}
      
        {isAuthenticated && (
          <li style={{ marginRight: '1rem' }}>
            <Link to="/user-panel">Panel użytkownika</Link>
          </li>
        )}
        <li style={{ marginRight: '1rem' }}>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', padding: 0, color: 'blue', cursor: 'pointer' }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              style={{ background: 'none', border: 'none', padding: 0, color: 'blue', cursor: 'pointer' }}
            >
              Login
            </button>
          )}
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
