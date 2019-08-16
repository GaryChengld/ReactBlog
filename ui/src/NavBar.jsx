import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function NavBar() {
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <Navbar.Brand>React-Blog</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Latest Post</Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
}
