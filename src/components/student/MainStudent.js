import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackgroundLayout from '../BackgroundLayout';

function MainStudent() {
  const navigate = useNavigate();
  const [codigoCurso, setCodigoCurso] = useState(null);

  useEffect(() => {
    const codigo = localStorage.getItem('codigoCurso');
    if (codigo) {
      setCodigoCurso(codigo);
    }
  }, []);

  const location = useLocation();
  const nombre = location.state?.nombre || 'Estudiante';

  return (
    <BackgroundLayout>
      <div className="container mt-5" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Bienvenido, {nombre}!</h2>

        <div className="d-flex flex-column gap-4">
          <div
            className="p-4 border rounded text-center"
            style={{ 
              cursor: 'pointer', 
              backgroundColor: '#e9f7ef', 
              color: 'black'
            }}
            onClick={() => navigate('/ingresar-codigo')}
          >
            <h4>Ingresar código para acceder a un curso 💻</h4>
          </div>

          {codigoCurso && (
            <div
              className="p-4 border rounded text-center"
              style={{ 
                cursor: 'pointer', 
                backgroundColor: '#e3f2fd', 
                color: 'black' // Asegura que el texto sea negro
              }}
              onClick={() => navigate('/curso')}
            >
              <h4>Mi curso 🏫</h4>
            </div>
          )}
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default MainStudent;
