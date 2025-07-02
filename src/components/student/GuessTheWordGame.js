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

  const [vocabulary, setVocabulary] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`/api/unidades/${unidadId}/vocabulario`, config);

        if (data && data.length > 0) {
          data.sort(() => Math.random() - 0.5);
          setVocabulary(data);
        } else {
          setError('There is no vocabulary for this unit.');
        }
      } catch (err) {
        setError('Error loading vocabulary.');
      } finally {
        setLoading(false);
      }
    };
    fetchVocabulary();
  }, [unidadId]);

  const handleSubmitGuess = (e) => {
    e.preventDefault();
    const correctWord = vocabulary[currentWordIndex].palabra;

    if (userGuess.trim().toLowerCase() === correctWord.toLowerCase()) {
      setFeedback('correct');
      setScore(score + 10);

      setTimeout(() => {
        if (currentWordIndex < vocabulary.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setFeedback(null);
          setUserGuess('');
        } else {
          setIsFinished(true);
        }
      }, 1500);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  useEffect(() => {
    if (isFinished) {
      alert(`Game over! Your final score: ${score}`);
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

  if (loading)
    return (
      <BackgroundLayout>
        <h2 className="text-white text-center mt-5">Loading...</h2>
      </BackgroundLayout>
    );
  if (error)
    return (
      <BackgroundLayout>
        <div className="alert alert-danger container mt-5">{error}</div>
      </BackgroundLayout>
    );
  if (isFinished)
    return (
      <BackgroundLayout>
        <div className="alert alert-success container mt-5">
          <h2> Congratulations, you completed the unit!</h2>
          <p> your score is {score} points.</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back to the game menu
          </button>
        </div>
      </BackgroundLayout>
    );
  if (vocabulary.length === 0)
    return (
      <BackgroundLayout>
        <h2 className="text-white text-center mt-5">Preparing game...</h2>
      </BackgroundLayout>
    );

  const currentWord = vocabulary[currentWordIndex];
  const currentHint = currentWord.palabra[0].toUpperCase();

  const imageUrl = currentWord.imagen.startsWith('http')
    ? currentWord.imagen
    : `${backendUrl}${currentWord.imagen}`;

  return (
    <BackgroundLayout>
      <div className="container mt-5 text-center">
        <div
          className="card shadow-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '12px',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          <div
            className="card-header"
            style={{ backgroundColor: 'transparent', borderBottom: 'none' }}
          >
            <h2 className="card-title">What do you see in the picture?</h2>
          </div>

          <div className="card-body">
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
                  placeholder="Write the word in English..."
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  disabled={feedback === 'correct'}
                  autoFocus
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={feedback === 'correct'}
                >
                  Check
                </button>
              </div>
            </form>

            {feedback && (
              <p style={feedbackStyles[feedback]}>
                {feedback === 'correct'
                  ? `Correct! The word is ${currentWord.palabra}.`
                  : 'Wrong answer. Try again!'}
              </p>
            )}
          </div>

          <div className="card-footer text-muted">Points: {score}</div>
        </div>

        <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
          Leave game
        </button>
      </div>
    </BackgroundLayout>
  );
}

export default GuessTheWordGame;
