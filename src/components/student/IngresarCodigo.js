import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import BackgroundLayout from '../BackgroundLayout';

function IngresarCodigo() {
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await axios.post('/api/cursos/join', { codigo }, config);

            alert(response.data.message); 

            const courseId = response.data.curso._id;
            navigate(`/curso/${courseId}`);

        } catch (err) {
            setError(err.response?.data?.message || 'Ocurrió un error.');
        } finally {
            setLoading(false);
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
                            placeholder="Ej: X4T-9A1"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                            required
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Uniéndote...' : 'Unirse al Curso'}
                    </button>
                </form>
            </div>
        </BackgroundLayout>
    );
}

export default IngresarCodigo;