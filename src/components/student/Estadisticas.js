import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from '../BackgroundLayout';

 //---- AUN NO SE HA IMPLEMENTADO EL BACKEND PARA ESTADÍSTICAS- ---
 
function Estadísticas() {
  const navigate = useNavigate();

  // Datos de ejemplo
  const rankingData = [
    { nombre: 'Matias Fernandez', puntaje: 95 },
    { nombre: 'Nicolas Gaete', puntaje: 90 },
    { nombre: 'Jorge Gallegos', puntaje: 85 },
    { nombre: 'Valentina Garcia', puntaje: 80 },
    { nombre: 'Diego Salazar', puntaje: 78 },
  ];

  const sortedData = rankingData
    .sort((a, b) => b.puntaje - a.puntaje)
    .map((item, index) => ({
      ...item,
      puesto: index + 1,
    }));

  return (
    <BackgroundLayout>
      <div className="container mt-5">
        <h2 className="text-center mb-4">🏆 Ranking de Estudiantes 🏆</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-success">
              <tr>
                <th>Puesto</th>
                <th>Nombre</th>
                <th>Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((estudiante, index) => (
                <tr key={index}>
                  <td>{estudiante.puesto}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.puntaje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón para volver a la página de curso */}
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate('/curso')}>
            Volver al curso
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Estadísticas;
