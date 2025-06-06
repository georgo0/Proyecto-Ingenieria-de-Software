import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from '../BackgroundLayout';

function Unidades() {
  const [nivelCurso, setNivelCurso] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const codigo = localStorage.getItem('codigoCurso');
    if (codigo) {
      const match = codigo.match(/^(\d)[A-Z]-\d{4}$/);
      if (match) {
        setNivelCurso(parseInt(match[1]));
      }
    }
  }, []);

const unidadesPorNivel = {
  4: [
    { nombre: 'Food', imagen: '/images/unidades/4/food.jpg' },
    { nombre: 'Space', imagen: '/images/unidades/4/space.jpg' },
    { nombre: 'Summer', imagen: '/images/unidades/4/summer.png' },
  ],
  5: [
    { nombre: 'City', imagen: '/images/unidades/5/city.jpg' },
    { nombre: 'School', imagen: '/images/unidades/5/school.jpg' },
    { nombre: 'Animals', imagen: '/images/unidades/5/animals.jpg' },
  ],
};

  const unidades = unidadesPorNivel[nivelCurso] || [];

  return (
        <BackgroundLayout>

    <div className="container mt-5 text-center">
      <h2 className="mb-4">Unidades para {nivelCurso}º Básico</h2>

      <div className="d-flex flex-column align-items-center gap-3">
{unidades.map((unidad, index) => (
  <div
    key={index}
    className="w-75 rounded border"
    style={{
      backgroundImage: `url(${unidad.imagen})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '150px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '64px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      transition: '0.3s',
    }}
    onClick={() => {
      navigate(`/minijuegos/${unidad.nombre.toLowerCase()}`);
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.03)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    {unidad.nombre}
  </div>
))}

      </div>

      {nivelCurso === null && (
        <p className="mt-4 text-danger">No se ha detectado el curso correctamente.</p>
      )}


        {/* Botón para volver a la página de curso */}
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate('/curso') }>
            Volver al curso
          </button>
        </div>
    </div>
        </BackgroundLayout>

  );
}

export default Unidades;
