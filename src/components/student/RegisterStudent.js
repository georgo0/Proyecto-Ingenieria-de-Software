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
          <h2 className="text-center mb-4">
              <div>Student Registration</div>
              <div
                className="fst-italic"
                style={{ fontSize: '1rem', 
                fontWeight: 400, 
                color: '#21bb75', 
                marginTop: '0.2rem' }}
              >
                Registro de Estudiante
              </div>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                 <span>Full Name/</span>
                  <span style={{ fontStyle: 'italic', 
                    color: '#21bb75', 
                    fontSize: '0.9rem', 
                    fontWeight: 400 }}>
                     Nombre Completo
                  </span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="First name, Middle name & Last name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <span>Email /</span>
                  <span style={{ fontStyle: 'italic', 
                    color: '#21bb75', 
                    fontSize: '0.9rem', 
                    fontWeight: 400 }}>
                    Correo electrónico
                  </span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <span>Password /</span>
                  <span style={{ fontStyle: 'italic', 
                    color: '#21bb75', 
                    fontSize: '0.9rem', 
                    fontWeight: 400 }}>
                    Contraseña
                  </span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Create your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
<button type="submit" className="btn btn-success w-100" disabled={loading}>
    {loading ? 'Registrando...' : 'Sign up'}
</button>
          </form>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default RegisterStudent;
