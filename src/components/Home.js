import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from './BackgroundLayout';
function Home() {
  const navigate = useNavigate();


  const contentStyle = {
    position: 'relative',
    zIndex: 2,
  };

  const textSpanishStyle = {
    color: '#ccc',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
    fontSize: '1.2rem',
    fontStyle: 'italic',
  };
 
  

  return (
        <BackgroundLayout>

      <div style={contentStyle}>
        <Container className="text-center text-white mb-4 pt-5">
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="fw-bold fs-1" style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)' }}>
              Welcome to our application!
            </h1>
            <h4 className="fw-normal fst-italic" style={{ ...textSpanishStyle }}>
              ¡Bienvenido a nuestra aplicación!
            </h4>
          </div>

          <div>
            <h1 className="fw-semibold fs-3" style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.6)' }}>
              Have fun while you learn English
            </h1>
            <h4 className="fw-normal fst-italic" style={{ ...textSpanishStyle }}>
              Diviértete mientras aprendes inglés
            </h4>
          </div>
        </Container>

        <Container className="d-flex justify-content-center align-items-start gap-4 mb-5">
          <Card style={{ width: '18rem' }}>
            <Card.Body className="text-center">
              <Card.Title>
                <div>Teacher's Sign up</div>
                <div
                  className="fst-italic"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '400',
                    color: '#2856e0',
                    marginTop: '0.2rem',
                  }}
                >
                  Registro para profesores
                </div>
              </Card.Title>

              <Card.Text>
                <div>To register as a teacher click here</div>
                <div
                  className="fst-italic"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '400',
                    color: '#2856e0',
                    marginTop: '0.2rem',
                  }}
                >
                Para registrarse como profesor haga click aquí
                </div>
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/register-teacher')}>
                Sign Up
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body className="text-center">
              <Card.Title>
              <div>Student's Sign up</div>
                <div
                  className="fst-italic"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '400',
                    color: '#2856e0',
                    marginTop: '0.2rem',
                  }}
                >
                  Registro para Alumnos
                </div>
              </Card.Title>

              <Card.Text>
                <div>To register as a student click here</div>
                <div
                  className="fst-italic"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '400',
                    color: '#2856e0',
                    marginTop: '0.2rem',
                  }}
                >
                Para registrarse como alumno haga click aquí
                </div>
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/register-student')}>
                Sign Up
              </Button>
            </Card.Body>
          </Card>
        </Container>

        <Container className="d-flex justify-content-center mt-4 mb-5">
          <Card className="text-center w-50">
            <Card.Body>
              <Card.Title>
                <div>Do you already have an account?</div>
                <div
                  className="fst-italic"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '400',
                    color: '#2856e0',
                    marginTop: '0.2rem',
                  }}
                >
                 ¿Ya tienes cuenta?
                </div>
                
              </Card.Title>
              <Card.Text>
                <div>Access here with your institutional account/</div>
                <div
                  className="fst-italic"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '400',
                    color: '#2856e0',
                    marginTop: '0.2rem',
                  }}
                >
                Accede aquí con tu cuenta institucional
                </div>
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/login')}>
                Log In
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </BackgroundLayout>
  );
}

export default Home;
