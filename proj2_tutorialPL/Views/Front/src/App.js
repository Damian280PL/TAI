import React from 'react';
import { Link } from 'react-router-dom';

function App() {
    const isAuthenticated = true; // Replace with actual authentication logic
    const isAdmin = true; // Replace with actual role check logic

    return (
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Aplikacja do nauki</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/warehouse/list">Lista produktów</Link>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/warehouse/add">Dodawanie produktu</Link>
                            </li>
                        )}
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/rent">Wypożycz</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/account/logout">Wyloguj</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/account/login">Logowanie</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/account/register">Rejestracja</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default App;
