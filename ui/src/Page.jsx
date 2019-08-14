import React from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

import NavBar from './NavBar.jsx';
import AppRouter from './AppRouter.jsx';

function Footer() {
  return (

    <Navbar bg="dark" variant="dark" expand="sm" fixed="bottom">
      <Container fluid>
        <div className="row">
          <div className="col-12 text-light">
            <small>&copy; React Blog 2019</small>
          </div>
        </div>
      </Container>
    </Navbar>
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
