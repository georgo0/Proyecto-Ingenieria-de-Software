import React from 'react';
import BackgroundLayout from '../BackgroundLayout';
import { useNavigate, useLocation } from 'react-router-dom';

function SelectCourse() {
  const grades = ['3° Básico', '4° Básico', '5° Básico', '6° Básico']; //Modificar a gusto :)
  const navigate = useNavigate();
  const location = useLocation();

  // const handleSelect = (grade) => {
  //   console.log(`Curso seleccionado: ${grade}`);
  //   navigate(`/main-student`);
  // };

  return (
    <BackgroundLayout variant="teachers">
      <div className="container py-5     text-center text-dark
">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5 text-center">
            <h1 className="display-5 fw-bold">Selecciona tu curso</h1>
            <p className="fs-4">Elige el nivel de curso que deseas revisar o gestionar.</p>

            <div className="dropdown mt-4">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Seleccionar curso
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {grades.map((grade, index) => (
                  <li key={index}>
                    <button className="dropdown-item" /* onClick={() => handleSelect(grade)} */>
                      {grade}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
         {/* Botón para volver a la página de curso */}
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate('/main-teacher')}>
            Volver al curso
          </button>
        </div>
    </BackgroundLayout>
  );
}

export default SelectCourse;
