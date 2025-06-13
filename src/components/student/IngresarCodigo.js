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
                <div style={{ marginBottom: '2rem' }}>
                    <h1 className="fw-bold fs-1 text-center" style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)' }}>
                        Enter a code to join a course
                    </h1>
                    <h4
                        className="fw-normal fst-italic text-center"
                        style={{
                        color: '#ccc', // azul pastel
                        fontSize: '1.2rem',
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.4)',
                        }}
                    >
                        Ingresar código para acceder a un curso
                    </h4>
                    </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="codigo" className="form-label">Course code</label>
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
                        {loading ? 'Joining...' : 'Join the Course'}
                    </button>
                </form>
            </div>
        </BackgroundLayout>
    );
}

export default IngresarCodigo;