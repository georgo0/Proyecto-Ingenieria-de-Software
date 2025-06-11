import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Register.css';
import BackgroundLayout from '../BackgroundLayout';
import axios from 'axios'; 

function RegisterStudent() {
  const navigate = useNavigate();



  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const userData = {
            nombre_completo: nombre,
            email: email,
            password: password,
        };

        const response = await axios.post('/api/alumnos/register', userData);

        const { token, user } = response.data;

        localStorage.setItem('token', token);


        setLoading(false);
        alert('¡Registro exitoso!');

        navigate('/main-student', { state: { nombre: user.nombre_completo } });

    } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || 'Ocurrió un error al registrarse.');
    }
};


  return (
    <BackgroundLayout>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 sombra-register" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Registro de Estudiante</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Tu nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
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
                placeholder="Crea una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
<button type="submit" className="btn btn-success w-100" disabled={loading}>
    {loading ? 'Registrando...' : 'Registrarse'}
</button>
          </form>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default RegisterStudent;
