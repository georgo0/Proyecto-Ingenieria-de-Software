import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from '../BackgroundLayout';
function IngresarCodigo() {
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

//PARA METERSE A CURSO HAY QUE INGRESAR UNO DE ESTOS CODIGOS 4B-2024 O 5A-2024

  const cursos = {
    '4B-2025': 'Cuarto Básico B',
    '5A-2024': 'Quinto Básico A',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cursos[codigo]) {
      localStorage.setItem('codigoCurso', codigo);
      localStorage.setItem('nombreCurso', cursos[codigo]);
      navigate('/curso');
    } else {
      alert('Código no válido. Intenta nuevamente.');
    }
  };

  return (
        <BackgroundLayout>

    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Ingresar código para acceder a un curso</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="codigo" className="form-label">Código del curso</label>
          <input
            type="text"
            id="codigo"
            className="form-control"
            placeholder="Ej: 4B-2024"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Enviar</button>
      </form>
    </div>
  </BackgroundLayout>
  );
}

export default IngresarCodigo;
