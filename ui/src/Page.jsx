import React from 'react';
import { Container, Navbar, Row } from 'react-bootstrap';

import NavBar from './NavBar.jsx';
import AppRouter from './AppRouter.jsx';
import UserContext from './UserContext.js';

function Footer() {
  return (

    <Container>
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

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { signedIn: false } };
    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    const response = await fetch(`${apiEndpoint}/user`, {
      method: 'POST',
      credentials: 'include',
    });
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn, name } = result;
    this.setState({ user: { signedIn, username: name } });
  }

  onUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Container>
          <NavBar user={user} onUserChange={this.onUserChange} />
          <UserContext.Provider value={user}>
            <AppRouter />
          </UserContext.Provider>
          <Footer />
        </Container>
      </div>
    );
  }
}
