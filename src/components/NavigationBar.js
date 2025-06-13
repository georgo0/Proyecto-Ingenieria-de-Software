// src/components/NavigationBar.js con ajuste de boton de 'Logout'
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();

  // Verifica si el usuario está logueado (token en localStorage)
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/'); // Redirige al home
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">App de inglés</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* Ítems a la izquierda */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          </Nav>

          {/* Ítems a la derecha */}
          <Nav className="ms-auto align-items-center">
            {isLoggedIn && (
              <Button
                variant="danger"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;


