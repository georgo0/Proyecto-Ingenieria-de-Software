// src/components/CreateCourse.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from '../BackgroundLayout'; // Asegúrate de que la ruta sea correcta
function CreateCourse() {
  const navigate = useNavigate();
  const [courseLevel, setCourseLevel] = useState('');
  const [year, setYear] = useState('');
  const [schoolName, setSchoolName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Curso creado:', { courseLevel, year, schoolName });
    // Aquí se podría guardar la información en el backend más adelante
  };

  // Solo permitir números en el input de año
  const handleYearChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setYear(value);
    }
  };

  return (
        <BackgroundLayout variant="teachers">

    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Crear un nuevo curso</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nivel del curso</label>
            <input
              type="number"
              className="form-control form-control-sm"
              min="1"
              max="6"
              value={courseLevel}
              onChange={(e) => setCourseLevel(e.target.value)}
              required
              placeholder="Ej: 3"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Letra</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={year}
              onChange={handleYearChange}
              required
              placeholder="Ej: A"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre del colegio</label>
          <input
            type="text"
            className="form-control"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="Ej: Escuela N°123"
            // Evaluar si mantener este campo de <nombre_colegio> en el futuro o eliminarlo y ver donde redirige el boton del formulario
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Crear curso</button>


      </form>

    {/* Botón para volver a la página de curso */}
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate('/main-teacher')}>
            Volver al curso
          </button>
        </div>
      </div>
      </BackgroundLayout>

  );
}

export default CreateCourse;
