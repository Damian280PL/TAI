import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth'; // Zaktualizuj import

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // Logowanie stanu autoryzacji
    console.log('Zalogowany:', isAuthenticated);

    const handleLogout = () => {
        logout(); // Funkcja wylogowująca z Keycloak
        navigate('/login'); // Przekierowanie na stronę logowania po wylogowaniu
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Aplikacja do nauki</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/products">Lista produktów</Link>
                        </li>
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <button className="nav-link text-dark" onClick={handleLogout}>Wyloguj</button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/login">Logowanie</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/register">Rejestracja</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
