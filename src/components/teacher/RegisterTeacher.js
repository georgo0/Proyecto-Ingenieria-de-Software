// components/RegisterTeacher.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Register.css'; // Asegúrate de que esta ruta sea válida 
import BackgroundLayout from '../BackgroundLayout'; 
function RegisterTeacher() {
  const [nombreProfesor, setNombreProfesor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar lógica de validación o guardar datos
    navigate('/main-teacher', { state: { nombreProfesor   } }); // Redirección al main teacher
  };

  return (
    <BackgroundLayout variant="teachers">
      <div className="container d-flex justify-content-center align-items-center vh-100 fondo-register">
        <div className="card p-4 sombra-register" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Registro de Profesor</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre Completo</label>

              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Tu nombre completo"
                value={nombreProfesor}
                onChange={(e) => setNombreProfesor(e.target.value)}
                required
              />

            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" placeholder="Crea una contraseña" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <input type="password" className="form-control" id="confirmPassword" placeholder="Confirma tu contraseña" />
            </div>
            <small className="text-muted d-block mb-3">Este formulario es exclusivo para profesores.</small>
            <button type="submit" className="btn btn-success w-100">Registrarse como Profesor</button>
          </form>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default RegisterTeacher;
