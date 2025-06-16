import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

function Unidades() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [unidades, setUnidades] = useState([]);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const courseResponse = await axios.get(`/api/cursos/${courseId}`, config);
                const cursoActual = courseResponse.data;
                setCourse(cursoActual);

                if (cursoActual && cursoActual.nivel) {
                    const unidadesResponse = await axios.get(`/api/unidades/nivel/${cursoActual.nivel}`, config);
                    setUnidades(unidadesResponse.data);
                } else {
                    setError("No se pudo determinar el nivel del curso.");
                }

            } catch (err) {
                setError("No se pudieron cargar las unidades.");
            } finally {
                setLoading(false);
            }
        };

        fetchUnits();
    }, [courseId]);

    if (loading) return <BackgroundLayout><h2 className="text-white text-center mt-5">Loading...</h2></BackgroundLayout>;
    if (error) return <BackgroundLayout><div className="alert alert-danger container mt-5">{error}</div></BackgroundLayout>;

    return (
        <BackgroundLayout>
            <div className="container mt-5 text-center">
                <h2 className="mb-4 text-white">Units for {course?.nivel}º Grade</h2>

                <div className="d-flex flex-column align-items-center gap-3">
                    {unidades.map((unidad) => (
                        <div
                            key={unidad._id}
                            className="w-75 rounded border"
                            style={{
                                backgroundImage: `url(${unidad.imagen})`, // Construimos la URL completa
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
                                transition: 'transform 0.3s',
                            }}
                            onClick={() => navigate(`/minijuegos/${unidad.nombre.toLowerCase()}`)}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                        >
                            {unidad.nombre}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-secondary" onClick={() => navigate(`/curso/${courseId}`)}>
                        Back to course
                    </button>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default Unidades;