// src/components/CreateCourse.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

function CreateCourse() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nivel: '',
        letra: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generatedCode, setGeneratedCode] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setGeneratedCode(null);
        setIsCopied(false);

        const nivel = parseInt(formData.nivel, 10);
        const letra = formData.letra;

        // Validaciones
        if (isNaN(nivel) || nivel < 3 || nivel > 6) {
            setError("El nivel del curso debe estar entre 3 y 6.");
            setLoading(false);
            return;
        }

        if (!/^[A-G]$/.test(letra)) {
            setError("La letra del curso debe ser entre A y G.");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("No estás autenticado. Por favor, inicia sesión de nuevo.");
                setLoading(false);
                return;
            }

            const config = { headers: { Authorization: `Bearer ${token}` } };

            const response = await axios.post('/api/cursos', formData, config);

            setGeneratedCode(response.data.codigo);
            setFormData({ nivel: '', letra: '' });

        } catch (err) {
            setError(err.response?.data?.message || 'Ocurrió un error al crear el curso.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <BackgroundLayout variant="teachers">
            <div className="container mt-5" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4 text-center">Crear un nuevo curso</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Nivel del curso</label>
                            <select
                                className="form-select"
                                name="nivel"
                                value={formData.nivel}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled hidden>Selecciona un nivel</option>
                                {[3, 4, 5, 6].map((nivel) => (
                                    <option key={nivel} value={nivel}>
                                        {nivel}° Básico
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Letra</label>
                            <select
                                className="form-select"
                                name="letra"
                                value={formData.letra}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled hidden>Selecciona una letra</option>
                                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((letra) => (
                                    <option key={letra} value={letra}>
                                        {letra}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? 'Creando...' : 'Crear curso'}
                    </button>
                </form>

                <div className="mt-4">
                    {error && <div className="alert alert-danger"><strong>Error:</strong> {error}</div>}
                    {generatedCode && (
                        <div className="alert alert-success text-center">
                            <h4 className="alert-heading">¡Curso Creado!</h4>
                            <p className="mb-2">Código para que tus alumnos se unan:</p>
                            <div className='d-flex align-items-center justify-content-center'>
                                <p className="fs-3 fw-bold mb-0 me-3" style={{ fontFamily: 'monospace', letterSpacing: '2px' }}>
                                    {generatedCode}
                                </p>
                                <button className="btn btn-light btn-sm" onClick={handleCopyCode}>
                                    {isCopied ? '¡Copiado!' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-secondary" onClick={() => navigate('/main-teacher')}>
                        Volver al menú principal
                    </button>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default CreateCourse;
