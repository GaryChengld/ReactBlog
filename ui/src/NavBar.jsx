import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

import SignInNavItem from './SignInNavItem.jsx';

export default function NavBar({ user, onUserChange }) {
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <Navbar.Brand>React-Blog</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/posts">Recent Posts</Nav.Link>
        </Nav>
        <Nav pullright="true">
          <SignInNavItem user={user} onUserChange={onUserChange} />
        </Nav>
      </Navbar>
    </Container>
  );
}
