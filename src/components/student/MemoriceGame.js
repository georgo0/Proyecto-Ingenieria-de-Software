import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MemoriceGame.css';
import BackgroundLayout from '../BackgroundLayout';

function MemoriceGame() {
    const { unidadId } = useParams();
    const navigate = useNavigate();

    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(new Set());
    const [moves, setMoves] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backendUrl = 'http://localhost:3000';

    // useEffect #1: Prepara el tablero al inicio
    useEffect(() => {
        const setupBoard = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data: vocabulario } = await axios.get(`/api/unidades/${unidadId}/vocabulario`, config);

                if (!vocabulario || vocabulario.length < 8) {
                    setError("No hay suficientes palabras en esta unidad para jugar (se necesitan 8).");
                    return;
                }
                const gameCards = [...vocabulario.slice(0, 8), ...vocabulario.slice(0, 8)]
                    .map((item, index) => ({ ...item, uniqueId: index }));
                
                gameCards.sort(() => Math.random() - 0.5);
                setCards(gameCards);
            } catch (err) {
                setError("Error al cargar el vocabulario del juego.");
            } finally {
                setLoading(false);
            }
        };
        setupBoard();
    }, [unidadId]);

    const handleCardClick = (index) => {
        if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.has(cards[index].palabra)) return;
        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);
    };

    const checkMatch = useCallback(() => {
        if (flippedCards.length === 2) {
            setMoves(moves + 1);
            const [firstIndex, secondIndex] = flippedCards;
            if (cards[firstIndex].palabra === cards[secondIndex].palabra) {
                setMatchedPairs(new Set(matchedPairs).add(cards[firstIndex].palabra));
                setFlippedCards([]);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    }, [flippedCards, cards, matchedPairs, moves]);

    // useEffect #2: Comprueba si hay un match
    useEffect(() => {
        checkMatch();
    }, [checkMatch]);

    // useEffect #3: Comprueba si el juego ha terminado y guarda el puntaje
    useEffect(() => {
        if (matchedPairs.size > 0 && matchedPairs.size === 8) {
            const score = Math.max(100 - (moves - 8) * 5, 10); 
            
            setTimeout(() => {
                alert(`¡Juego terminado! Has ganado ${score} puntos.`);
                const saveScore = async () => {
                    try {
                        const token = localStorage.getItem('token');
                        const config = { headers: { Authorization: `Bearer ${token}` } };
                        await axios.patch('/api/alumnos/update-score', { score }, config);
                        console.log('Puntaje actualizado exitosamente.');
                        navigate(`/minijuegos/${unidadId}`);
                    } catch (error) {
                        console.error('Error al guardar el puntaje:', error);
                    }
                };
                saveScore();
            }, 700);
        }
    }, [matchedPairs, moves, unidadId, navigate]);

    // Manejo de estados de carga y error
    if (loading) return <BackgroundLayout><h2 className="text-white text-center mt-5">Loading game...</h2></BackgroundLayout>;
    if (error) return <BackgroundLayout><div className="alert alert-danger container mt-5">{error}</div></BackgroundLayout>;

      return (
        <BackgroundLayout>
            <div className="container text-center mt-4">
                <h2 className="text-white">Memory Game</h2>
                <div className="memorice-board">
                    {cards.map((card, index) => {
                        
                        const imageUrl = card.imagen && card.imagen.startsWith('http')
                            ? card.imagen 
                            : `${backendUrl}${card.imagen}`; 

                        return (
                            <div 
                                key={card.uniqueId} 
                                className={`card ${flippedCards.includes(index) || matchedPairs.has(card.palabra) ? 'flipped' : ''} ${matchedPairs.has(card.palabra) ? 'matched' : ''}`}
                                onClick={() => handleCardClick(index)}
                            >
                                <div className="card-inner">
                                    <div className="card-face card-front">?</div>
                                    <div className="card-face card-back">
                                        <img src={imageUrl} alt={card.palabra} />
                                        <p>{card.palabra}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>Leave game</button>
                </div>
            </div>
        </BackgroundLayout>
    );

}

export default MemoriceGame;