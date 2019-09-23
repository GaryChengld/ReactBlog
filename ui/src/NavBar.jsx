import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

import SignInNavItem from './SignInNavItem.jsx';
import AddPostNavItem from './AddPostNavItem.jsx';
import SearchNavItem from './SearchNavItem.jsx';

export default function NavBar({ user, onUserChange }) {
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <Navbar.Brand>React-Blog</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/posts">Recent Posts</Nav.Link>
          <AddPostNavItem user={user} />
        </Nav>
        <Nav pullright="true">
          <SearchNavItem />
          <SignInNavItem user={user} onUserChange={onUserChange} />
        </Nav>
      </Navbar>
    </Container>
  );
}
