import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

function CourseRoster() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [displayedAlumnos, setDisplayedAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get(`/api/cursos/${courseId}`, config);
                setCourse(data);
                setDisplayedAlumnos(data.alumnos);
            } catch (error) {
                console.error("Error cargando detalles del curso", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetails();
    }, [courseId]);

    const sortByScoreDesc = () => {
        const sorted = [...displayedAlumnos].sort((a, b) => b.puntaje - a.puntaje);
        setDisplayedAlumnos(sorted);
    };

    const sortByScoreAsc = () => {
        const sorted = [...displayedAlumnos].sort((a, b) => a.puntaje - b.puntaje);
        setDisplayedAlumnos(sorted);
    };

    if (loading)
        return (
            <BackgroundLayout variant="teachers">
                <h2 className='text-white text-center mt-5'>Cargando lista...</h2>
            </BackgroundLayout>
        );

    if (!course)
        return (
            <BackgroundLayout variant="teachers">
                <h2 className='text-white text-center mt-5'>Curso no encontrado.</h2>
            </BackgroundLayout>
        );

    return (
        <BackgroundLayout variant="teachers">
            <div className="container mt-5 d-flex justify-content-center">
                <div
                    className="card p-4"
                    style={{
                        backgroundColor: '#f5f5dc', // Beige suave
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        maxWidth: '700px', // Ancho máximo más razonable
                        width: '100%',
                    }}
                >
                    <div className="card-header text-center" style={{ backgroundColor: 'transparent', borderBottom: 'none' }}>
                        <h3 className="fw-bold">Lista de Alumnos - Curso {course.nivel}° {course.letra}</h3>
                        <p className="text-muted mb-0">Código del curso: {course.codigo}</p>
                    </div>

                    <div className="card-body text-center">
                        <div className="btn-group flex-wrap" role="group" aria-label="Opciones de ordenamiento">
                            <button type="button" className="btn btn-primary m-2" onClick={sortByScoreDesc}>
                                Puntajes más altos 📈
                            </button>
                            <button type="button" className="btn btn-primary m-2" onClick={sortByScoreAsc}>
                                Puntajes más bajos 📉
                            </button>
                        </div>
                    </div>

                    <ul className="list-group list-group-flush">
                        {displayedAlumnos.length > 0 ? (
                            displayedAlumnos.map(alumno => (
                                <li
                                    key={alumno._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                    style={{ backgroundColor: 'transparent' }}
                                >
                                    <div>
                                        {alumno.nombre_completo}
                                        <small className="d-block text-muted">{alumno.email}</small>
                                    </div>
                                    <span className="badge bg-primary rounded-pill fs-6">
                                        Puntaje: {alumno.puntaje} 🏅
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item text-center" style={{ backgroundColor: 'transparent' }}>
                                Aún no hay alumnos inscritos en este curso.
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/ver-cursos')}>
                    Volver a mis cursos
                </button>
            </div>
        </BackgroundLayout>
    );
}

export default CourseRoster;
