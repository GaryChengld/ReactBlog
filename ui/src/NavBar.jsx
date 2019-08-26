import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

import SignInNavItem from './SignInNavItem.jsx';

export default function NavBar() {
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <Navbar.Brand>React-Blog</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/posts">Latest Post</Nav.Link>
        </Nav>
        <Nav pullright="true">
          <SignInNavItem />
        </Nav>
      </Navbar>
    </Container>
  );
}
