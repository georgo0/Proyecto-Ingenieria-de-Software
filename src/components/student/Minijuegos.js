import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

function Minijuegos() {
    const { unidadId } = useParams();
    const navigate = useNavigate();

    const [unidad, setUnidad] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnidadDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const { data } = await axios.get(`/api/unidades/details/${unidadId}`, config);
                setUnidad(data);

            } catch (err) {
                setError("No se pudieron cargar los minijuegos para esta unidad.");
            } finally {
                setLoading(false);
            }
        };

        fetchUnidadDetails();
    }, [unidadId]);

    const handleGameClick = (juegoTipo) => {
        // Se construye la ruta dinámicamente según el 'tipo' del juego
        navigate(`/minijuegos/${juegoTipo}/${unidadId}`);
    };

    if (loading) return <BackgroundLayout><h2 className="text-white text-center mt-5">Loading games...</h2></BackgroundLayout>;
    if (error) return <BackgroundLayout><div className="alert alert-danger container mt-5">{error}</div></BackgroundLayout>;

    return (
        <BackgroundLayout>
            <div className="container mt-5">
                <h2 className="mb-4 text-center text-white">Minigames for unit: {unidad?.nombre}</h2>

                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-row gap-3 overflow-auto px-2 pb-3">
                        {unidad?.juegosDisponibles.length > 0 ? (
                            unidad.juegosDisponibles.map((juego, index) => (
                                <div
                                    key={index}
                                    className="card text-center p-3"
                                    style={{ minWidth: '200px', cursor: 'pointer' }}
                                    onClick={() => handleGameClick(juego.tipo)}
                                >
                                    <h5>{juego.nombre}</h5>
                                </div>
                            ))
                        ) : (
                            <p className="text-white">There are no games available for this unit.</p>
                        )}
                    </div>
                </div>

                <div className="text-center mt-4">
                    {/* navigate(-1) es un truco simple para "volver" a la página anterior */}
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                        Back to units
                    </button>
                </div>
            </div>
        </BackgroundLayout>
    );
}

export default Minijuegos;