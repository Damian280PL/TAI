import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [Email, setEmail] = useState('');
    const [UserName, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const userRegisterData = {
            Email,
            UserName, // Keep as is since it matches the backend model
            Password,
        };

        try {
            const response = await axios.post('http://localhost:7042/Account/Register', userRegisterData);
            setSuccessMessage(response.data.Message);
            setErrorMessage('');
            // Reset form fields
            setEmail('');
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error("Registration error:", error);
            if (error.response && error.response.data) {
                if (Array.isArray(error.response.data)) {
                    // Map the errors if they are an array
                    setErrorMessage(error.response.data.map(err => err.description).join(', '));
                } else {
                    // General error handling
                    setErrorMessage(error.response.data.Message || 'Registration error occurred. Please try again.');
                }
            } else {
                setErrorMessage('An error occurred during registration. Please try again later.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Rejestracja</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={UserName}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hasło:</label>
                    <input
                        type="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Zarejestruj</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default Register;
