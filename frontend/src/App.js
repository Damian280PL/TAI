// src/app.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import ProductList from './components/ProductList';
import { AuthProvider, AuthContext } from './components/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/products" element={<ProductList />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
