// components/RegisterTeacher.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Register.css';
import BackgroundLayout from '../BackgroundLayout';

function RegisterTeacher() {
    const navigate = useNavigate();

    const [nombreProfesor, setNombreProfesor] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const profesorData = {
                nombre_completo: nombreProfesor,
                email,
                password
            };

        const response = await axios.post('/api/profesores/register', profesorData);

        const { token, user } = response.data;

        localStorage.setItem('token', token);


            setLoading(false);
            alert('¡Profesor registrado exitosamente!');
            navigate('/main-teacher', { state: { nombreProfesor: response.data.nombre_completo } });

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Ocurrió un error al registrarse.');
        }
    };

    return (
        <BackgroundLayout variant="teachers">
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 sombra-register" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center mb-4">Registro de Profesor</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre Completo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={nombreProfesor}
                                onChange={(e) => setNombreProfesor(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        <button type="submit" className="btn btn-success w-100" disabled={loading}>
                            {loading ? 'Registrando...' : 'Registrarse como Profesor'}
                        </button>
                    </form>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default RegisterTeacher;