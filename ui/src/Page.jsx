import React from 'react';
import { Container, Navbar, Row } from 'react-bootstrap';

import NavBar from './NavBar.jsx';
import AppRouter from './AppRouter.jsx';

function Footer() {
  return (

    <Container fluid>
      <Navbar bg="dark" variant="dark" expand="sm" fixed="bottom">
        <Row>
          <div className="col-12 text-light">
            <small>&copy; React Blog 2019</small>
          </div>
        </Row>
      </Navbar>
    </Container>
  );
}

export default function Page() {
  return (
    <div>
      <Container fluid>
        <NavBar />
        <AppRouter />
        <Footer />
      </Container>
    </div>
  );
}
