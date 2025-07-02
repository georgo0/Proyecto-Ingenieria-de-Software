// src/components/SelectCourse.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

function SelectCourse() {
    const navigate = useNavigate();
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacherCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get('/api/cursos/my-courses', config);
                setMyCourses(data);
            } catch (error) {
                console.error("Error cargando los cursos", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeacherCourses();
    }, []);

    const handleSelect = (courseId) => {
        navigate(`/teacher/course-roster/${courseId}`);
    };

    if (loading) {
        return (
            <BackgroundLayout variant="teachers">
                <h2 className='text-white text-center mt-5'>Cargando tus cursos...</h2>
            </BackgroundLayout>
        );
    }

    return (
        <BackgroundLayout variant="teachers">
            <div className="container py-5 d-flex flex-column align-items-center">
                <div
                    style={{
                        backgroundColor: '#f5f5dc', // Beige claro
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        padding: '3rem',
                        maxWidth: '800px',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <h1 className="display-5 fw-bold text-dark mb-3">Mis Cursos</h1>
                    <p className="fs-4 text-secondary mb-4">
                        Selecciona el curso del que deseas ver la lista de alumnos.
                    </p>

                    {myCourses.length > 0 ? (
                        myCourses.map(course => (
                            <button
                                key={course._id}
                                className="btn btn-primary m-2"
                                onClick={() => handleSelect(course._id)}
                            >
                                Curso {course.nivel}° {course.letra}
                            </button>
                        ))
                    ) : (
                        <p className='mt-4 text-muted'>Aún no has creado ningún curso.</p>
                    )}
                </div>

                <button
                    className="btn btn-secondary mt-4"
                    onClick={() => navigate('/main-teacher')}
                >
                    Volver al menú
                </button>
            </div>
        </BackgroundLayout>
    );
}

export default SelectCourse;
