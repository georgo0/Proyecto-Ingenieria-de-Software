import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

// Este componente muestra la lista de alumnos inscritos en un curso específico.

function CourseRoster() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get(`/api/cursos/${courseId}`, config);
                setCourse(data);
            } catch (error) {
                console.error("Error cargando detalles del curso", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetails();
    }, [courseId]);

    if (loading) return <BackgroundLayout variant="teachers"><h2 className='text-white text-center mt-5'>Cargando lista...</h2></BackgroundLayout>;
    if (!course) return <BackgroundLayout variant="teachers"><h2 className='text-white text-center mt-5'>Curso no encontrado.</h2></BackgroundLayout>;

    return (
        <BackgroundLayout variant="teachers">
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header text-center">
                        <h3>Lista de Alumnos - Curso {course.nivel}° {course.letra}</h3>
                        <p className="text-muted mb-0">Código del curso: {course.codigo}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        {course.alumnos.length > 0 ? (
                            course.alumnos.map(alumno => (
                                <li key={alumno._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {alumno.nombre_completo}
                                    <span className="badge bg-secondary rounded-pill">{alumno.email}</span>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item text-center">Aún no hay alumnos inscritos en este curso.</li>
                        )}
                    </ul>
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-secondary" onClick={() => navigate('/ver-cursos')}>
                        Volver a mis cursos
                    </button>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default CourseRoster;