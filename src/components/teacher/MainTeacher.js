// src/components/MainTeacher.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackgroundLayout from '../BackgroundLayout'; 

function MainTeacher() {
  const navigate = useNavigate();
  const location = useLocation();
  const nombreProfesor = location.state?.nombreProfesor || 'Profesor';

  return (
    <BackgroundLayout variant="teachers">

      <div className="container mt-5 text-center text-dark" style={{ maxWidth: '600px' }}>

        <h2 className="text-center mb-4 text-white ">Bienvenido, {nombreProfesor}</h2>

        <div className="d-flex flex-column gap-4">
        <div
          className="p-4 border rounded text-center"
          style={{ cursor: 'pointer', backgroundColor: '#e9f7ef' }}
          onClick={() => navigate('/crear-curso')}
        >
          <h4>Crear un nuevo curso</h4>
        </div>

        <div
          className="p-4 border rounded text-center"
          style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
          onClick={() => navigate('/ver-cursos')}
        >
          <h4>Ver mis cursos</h4>
        </div>
      </div>
    </div>
    </BackgroundLayout>
  );
}

export default MainTeacher;
