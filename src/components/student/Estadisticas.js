import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

function Estadísticas() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [myScore, setMyScore] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const { data } = await axios.get(`/api/cursos/${courseId}/leaderboard`, config);

                setMyScore(data.myScore);
                setLeaderboard(data.leaderboard);

            } catch (err) {
                setError("No se pudieron cargar las estadísticas.");
                console.error("Error cargando estadísticas:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [courseId]);

    if (loading) return <BackgroundLayout><h2 className="text-white text-center mt-5">Cargando estadísticas...</h2></BackgroundLayout>;
    if (error) return <BackgroundLayout><div className="alert alert-danger container mt-5">{error}</div></BackgroundLayout>;

    return (
        <BackgroundLayout>
            <div className="container mt-5">
                <div className="card text-center mb-5 shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title">Tu Puntaje Actual</h4>
                        <p className="display-4 fw-bold text-success">{myScore} 🏆</p>
                    </div>
                </div>

                {/* Sección para el Ranking */}
                <h2 className="text-center mb-4 text-white">🥇 Ranking del Curso 🥇</h2>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped text-center table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Puesto</th>
                                <th>Nombre</th>
                                <th>Puntaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((estudiante, index) => (
                                <tr key={estudiante._id}>
                                    <td>{index + 1}</td>
                                    <td>{estudiante.nombre_completo}</td>
                                    <td>{estudiante.puntaje}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-secondary" onClick={() => navigate(`/curso/${courseId}`)}>
                        Volver al curso
                    </button>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default Estadísticas;