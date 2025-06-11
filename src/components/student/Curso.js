import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

function Curso() {
    const navigate = useNavigate();
    const { courseId } = useParams(); 

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                
                const response = await axios.get(`/api/cursos/${courseId}`, config);
                
                setCourse(response.data);
            } catch (err) {
                setError("No se pudo cargar la información del curso o no tienes permiso para verlo.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]); 

    const opciones = [
        { nombre: 'Unidades 📔', ruta: `/unidades/${courseId}` },
        { nombre: 'Estadísticas 🥇', ruta: `/estadisticas/${courseId}` },
        { nombre: 'Volver al inicio 🏠', ruta: '/main-student' },
    ];

    if (loading) {
        return <BackgroundLayout><h2 className="text-white text-center mt-5">Cargando curso...</h2></BackgroundLayout>;
    }

    if (error) {
        return <BackgroundLayout><div className="alert alert-danger container mt-5">{error}</div></BackgroundLayout>;
    }

    return (
        <BackgroundLayout>
            <div className="container mt-5 text-center text-dark">
                <h2 className="mb-4 text-white">Bienvenido a tu curso de {course?.nivel}°{course?.letra}</h2>

                <div className="d-flex flex-column gap-4 align-items-center mt-4">
                    {opciones.map((op, index) => (
                        <div
                            key={index}
                            className="p-4 border rounded w-75"
                            style={{ cursor: 'pointer', backgroundColor: '#e0ffe0' }}
                            onClick={() => navigate(op.ruta)}
                        >
                            <h4>{op.nombre}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default Curso;