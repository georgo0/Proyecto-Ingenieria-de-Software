import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackgroundLayout from '../BackgroundLayout';
function Minijuegos() {
  const { unidadId } = useParams();
  const [nivelCurso, setNivelCurso] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const codigo = localStorage.getItem('codigoCurso');
    if (codigo) {
      const match = codigo.match(/^([4-6])[A-Z]-\d{4}$/);
      if (match) {
        setNivelCurso(parseInt(match[1]));
      }
    }
  }, []);

  // Datos de ejemplo
  const juegosPorNivelYUnidad = {
    4: {
      food: ['Memoria de Comida', 'Emparejar imágenes'],
      space: ['Trivia del Espacio', 'Vocabulario en órbita'],
      summer: ['Juego de Ropa de Verano', 'Arrastrar y Soltar']
    },
    5: {
      city: ['Completa la frase', 'Encuentra el lugar'],
      school: ['Ordena las palabras', 'Trivia escolar'],
      animals: ['Sonidos de animales', 'Trivia de animales']
    }
  };
const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

  const juegos = (juegosPorNivelYUnidad[nivelCurso] || {})[unidadId] || [];

  return (
    <BackgroundLayout>
      <div className="container mt-5">

        <h2 className="mb-4 text-center">Minigames for unit: {capitalizar(unidadId)}</h2>

        <div className="d-flex justify-content-center">
          <div
            className="d-flex flex-row gap-3 overflow-auto px-2 pb-3"
            style={{
              maxWidth: '100%',
              whiteSpace: 'nowrap',
            }}
          >
            {juegos.map((juego, index) => (
              <div
                key={index}
                className="card text-center p-3"
                style={{
                  minWidth: '200px',
                  backgroundColor: '#e0ffe0',
                  cursor: 'pointer',
                  transition: '0.3s',
                  fontWeight: 'bold',
                  flex: '0 0 auto',
                }}
                onClick={() => {
                  alert(`Acceder a: ${juego}`);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c2f0c2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e0ffe0';
                }}
              >
                {juego}
              </div>
            ))}
          </div>
        </div>

                {/* Botón para volver a la página de curso */}
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate('/unidades')}>
            Back to units
          </button>
        </div>

        {nivelCurso === null && (
          <p className="mt-4 text-danger text-center">No se detectó correctamente el curso.</p>
        )}
      </div>
    </BackgroundLayout>
  );
}

export default Minijuegos;
