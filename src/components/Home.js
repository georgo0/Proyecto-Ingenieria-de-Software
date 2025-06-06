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

  return (
        <BackgroundLayout>

      <div style={contentStyle}>
        <Container className="text-center text-white mb-4 pt-5">
          <h1 className="fw-bold fs-1" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
            ¡Bienvenido a nuestra aplicación!
          </h1>
          <h5 className="fw-semibold fs-4" style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.6)' }}>
            Diviértete mientras aprendes inglés.
          </h5>
        </Container>

        <Container className="d-flex justify-content-center align-items-start gap-4 mb-5">
          <Card style={{ width: '18rem' }}>
            <Card.Body className="text-center">
              <Card.Title>Registro para Profesores</Card.Title>
              <Card.Text>Para registrarse como profesor haga click aquí.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/register-teacher')}>
                Registrarse
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body className="text-center">
              <Card.Title>Registro para Alumnos</Card.Title>
              <Card.Text>Para registrar la cuenta de un alumno haga click aquí.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/register-student')}>
                Registrarse
              </Button>
            </Card.Body>
          </Card>
        </Container>

        <Container className="d-flex justify-content-center mt-4 mb-5">
          <Card className="text-center w-50">
            <Card.Body>
              <Card.Title>¿Ya tienes cuenta?</Card.Title>
              <Card.Text>Accede aquí con tu cuenta institucional.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/login')}>
                Iniciar sesión
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </BackgroundLayout>
  );
}

export default Home;
