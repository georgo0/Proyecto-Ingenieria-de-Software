// src/components/NavigationBar.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
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

        
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;


