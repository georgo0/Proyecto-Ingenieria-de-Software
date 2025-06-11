// src/components/Login.js

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import BackgroundLayout from './BackgroundLayout';

function Login() {
    const navigate = useNavigate(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setError(null);

        try {
            const loginData = { email, password };
            const response = await axios.post('/api/auth/login', loginData);

            localStorage.setItem('token', response.data.token);

            const userRole = response.data.user.role;
            if (userRole === 'profesor') {
                navigate('/main-teacher');
            } else {
                navigate('/main-student');
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <BackgroundLayout>
            <div className="container d-flex justify-content-center align-items-center vh-100 fondo-login">
                <div className="card p-4 sombra-login" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Ingresa tu correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                // 👈 Conectamos el input al estado 'password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        {error && <div className="alert alert-danger p-2">{error}</div>}

                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default Login;