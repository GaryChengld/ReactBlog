import React from 'react';
import { Container } from 'react-bootstrap';

import NavBar from './NavBar.jsx';
import AppRouter from './AppRouter.jsx';

export default function Page() {
  return (
    <div>
      <Container fluid>
        <NavBar />
        <AppRouter />
      </Container>
    </div>
  );
}
