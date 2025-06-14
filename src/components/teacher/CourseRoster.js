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

    
    // Ordenar por nombre: no se esta usando aun
    const sortByName = () => {
        const sorted = [...displayedAlumnos].sort((a, b) => 
            a.nombre_completo.localeCompare(b.nombre_completo)
        );
        setDisplayedAlumnos(sorted);
    };

    // Ordenar por puntaje de más alto a más bajo
    const sortByScoreDesc = () => {
        const sorted = [...displayedAlumnos].sort((a, b) => b.puntaje - a.puntaje);
        setDisplayedAlumnos(sorted);
    };

    // Ordenar por puntaje de más bajo a más alto
    const sortByScoreAsc = () => {
        const sorted = [...displayedAlumnos].sort((a, b) => a.puntaje - b.puntaje);
        setDisplayedAlumnos(sorted);
    };


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

                    <div className="card-body text-center">
                        <div className="btn-group" role="group" aria-label="Opciones de ordenamiento">
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
                                <li key={alumno._id} className="list-group-item d-flex justify-content-between align-items-center">
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