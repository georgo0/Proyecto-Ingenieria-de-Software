import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundLayout from '../BackgroundLayout';

const backendUrl = 'http://localhost:3000';

const feedbackStyles = {
    correct: { color: 'green', fontWeight: 'bold' },
    incorrect: { color: 'red', fontWeight: 'bold' },
};

function GuessTheWordGame() {
    const { unidadId } = useParams();
    const navigate = useNavigate();

    // Estados del juego
    const [vocabulary, setVocabulary] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userGuess, setUserGuess] = useState('');
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', o null
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    
    // Estados de UI
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carga el vocabulario al iniciar
    useEffect(() => {
        const fetchVocabulary = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get(`/api/unidades/${unidadId}/vocabulario`, config);
                
                if (data && data.length > 0) {
                    data.sort(() => Math.random() - 0.5); // Barajamos el vocabulario
                    setVocabulary(data);
                } else {
                    setError("No hay vocabulario para esta unidad.");
                }
            } catch (err) {
                setError("Error al cargar el vocabulario.");
            } finally {
                setLoading(false);
            }
        };
        fetchVocabulary();
    }, [unidadId]);
    
    // Lógica para manejar el envío del formulario
    const handleSubmitGuess = (e) => {
        e.preventDefault();
        const correctWord = vocabulary[currentWordIndex].palabra;

        if (userGuess.trim().toLowerCase() === correctWord.toLowerCase()) {
            setFeedback('correct');
            setScore(score + 10); // Gana 10 puntos por acierto

            setTimeout(() => {
                if (currentWordIndex < vocabulary.length - 1) {
                    setCurrentWordIndex(currentWordIndex + 1);
                    setFeedback(null);
                    setUserGuess('');
                } else {
                    setIsFinished(true); // Se acabaron las palabras
                }
            }, 1500); // Espera 1.5s antes de pasar a la siguiente
        } else {
            setFeedback('incorrect');
            setTimeout(() => setFeedback(null), 1500);
        }
    };
    
    // Efecto para guardar el puntaje cuando el juego termina
    useEffect(() => {
        if (isFinished) {
            alert(`¡Juego terminado! Tu puntaje final: ${score}`);
            const saveFinalScore = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    await axios.patch('/api/alumnos/update-score', { score }, config);
                } catch (error) {
                    console.error('Error al guardar el puntaje final:', error);
                }
            };
            saveFinalScore();
        }
    }, [isFinished, score]);
    
    if (loading) return <BackgroundLayout><h2 className="text-white text-center mt-5">Cargando...</h2></BackgroundLayout>;
    if (error) return <BackgroundLayout><div className="alert alert-danger container mt-5">{error}</div></BackgroundLayout>;
    if (isFinished) return <BackgroundLayout><div className="alert alert-success container mt-5"><h2>¡Felicidades, completaste la unidad!</h2><p>Tu puntaje fue de {score} puntos.</p><button className="btn btn-primary" onClick={() => navigate(-1)}>Volver al menú de juegos</button></div></BackgroundLayout>;
    if (vocabulary.length === 0) return <BackgroundLayout><h2 className="text-white text-center mt-5">Preparando juego...</h2></BackgroundLayout>;

    // Obtenemos la primera letra como pista
    const currentWord = vocabulary[currentWordIndex];
    const currentHint = currentWord.palabra[0].toUpperCase();


    // Comprueba si la ruta de la imagen es una URL completa o una local
    const imageUrl = currentWord.imagen.startsWith('http')
        ? currentWord.imagen // Si es de internet, úsala directamente
        : `${backendUrl}${currentWord.imagen}`; // Si es local, añade la URL del backend


    return (
        <BackgroundLayout>
            <div className="container mt-5 text-center">
                <div className="card shadow-lg">
                    <div className="card-header">
                        <h2 className="card-title">What do you see in the picture?</h2>
                    </div>
                    <div className="card-body">
                        {/* 👇 Usamos la nueva variable imageUrl */}
                        <img 
                            src={imageUrl} 
                            alt="Adivina el vocabulario" 
                            className="img-fluid rounded mb-3"
                            style={{ maxHeight: '300px', objectFit: 'contain' }}
                        />
                        <form onSubmit={handleSubmitGuess}>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Hint: {currentHint}</span>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Escribe la palabra en inglés..."
                                    value={userGuess}
                                    onChange={(e) => setUserGuess(e.target.value)}
                                    disabled={feedback === 'correct'}
                                    autoFocus
                                />
                                <button className="btn btn-primary" type="submit" disabled={feedback === 'correct'}>Check</button>
                            </div>
                        </form>
                        {feedback && (
                            <p style={feedbackStyles[feedback]}>
                                {feedback === 'correct' ? `¡Correcto! La palabra es ${currentWord.palabra}.` : 'Respuesta incorrecta. ¡Inténtalo de nuevo!'}
                            </p>
                        )}
                    </div>
                    <div className="card-footer text-muted">
                        Points: {score}
                    </div>
                </div>
                <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>Leave game</button>
            </div>
        </BackgroundLayout>
    );
}

export default GuessTheWordGame;