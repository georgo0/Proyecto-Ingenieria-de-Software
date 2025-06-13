import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

function MainStudent() {
    const navigate = useNavigate();
    const location = useLocation();

    const [myCourse, setMyCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const nombre = location.state?.nombre || 'Estudiante';

    useEffect(() => {
        const fetchMyCourse = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) { setLoading(false); return; }
                const config = { headers: { Authorization: `Bearer ${token}` } };
                
                const response = await axios.get('/api/alumnos/my-courses', config);
                
                setMyCourse(response.data);

            } catch (err) {
                setError("No se pudo cargar tu curso.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourse();
    }, []);

    if (loading) {
        return <BackgroundLayout><div className="container mt-5 text-center"><h2>Cargando...</h2></div></BackgroundLayout>;
    }

    return (
        <BackgroundLayout>
            <div className="container mt-5" style={{ maxWidth: '600px' }}>
                <h2 className="text-center mb-4">Welcome, {nombre}!</h2>
                <div className="d-flex flex-column gap-4">

                    {/*  Si no tiene curso, muestra el botón para unirse */}
                    {!myCourse && (
                        <div
                            className="p-4 border rounded text-center"
                            style={{ cursor: 'pointer', backgroundColor: '#e9f7ef', color: 'black' }}
                            onClick={() => navigate('/ingresar-codigo')}
                        >
                            <h4>
                                <div>Enter the code-class to access a course 💻</div>
                                <div
                                    className="fst-italic"
                                    style={{ fontSize: '1rem', 
                                    fontWeight: 400, 
                                    color: '#2856e0', 
                                    marginTop: '0.2rem' }}
                                >
                                    Ingresa el código de clase para acceder a un curso
                                </div>
                               
                            </h4>
                        </div>
                    )}

                    {/* Si SÍ tiene curso, muestra el botón para ir a ese curso */}
                    {myCourse && (
                         <div
                            className="p-4 border rounded text-center"
                            style={{ cursor: 'pointer', backgroundColor: '#e3f2fd', color: 'black' }}
                            onClick={() => navigate(`/curso/${myCourse._id}`)}
                        >
                            <h5>Ir a mi curso: {myCourse.nivel}° {myCourse.letra} 🏫</h5>
                        </div>
                    )}
                    
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default MainStudent;