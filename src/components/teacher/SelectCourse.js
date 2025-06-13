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

    if (loading) return <BackgroundLayout variant="teachers"><h2 className='text-white text-center mt-5'>Cargando tus cursos...</h2></BackgroundLayout>;

    return (
        <BackgroundLayout variant="teachers">
            <div className="container py-5 text-center">
                <div className="p-5 mb-4 bg-light rounded-3">
                    <h1 className="display-5 fw-bold" style={{ color: 'black' }}>Mis Cursos</h1>
                    <p className="fs-4" style={{ color: 'black' }}>Selecciona el curso del que deseas ver la lista de alumnos.</p>
                    
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
                        <p className='mt-4'>Aún no has creado ningún curso.</p>
                    )}
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-secondary" onClick={() => navigate('/main-teacher')}>
                        Volver al menú
                    </button>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default SelectCourse;