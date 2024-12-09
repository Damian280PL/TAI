import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Login = () => {
    const { keycloak } = useContext(AuthContext);

    const handleLogin = () => {
        keycloak.login();
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login with Keycloak</button>
        </div>
    );
};

export default Login;
