import React from 'react';
import {
  Nav, NavDropdown, Modal, Button,
} from 'react-bootstrap';

import withToast from './withToast.jsx';

class SigninNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      disabled: true,
      user: { signedIn: false, username: '' },
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    if (!clientId) return;
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({ client_id: clientId }).then(() => {
          this.setState({ disabled: false });
        });
      }
    });
  }

  onSelect(selectedKey) {
    if (selectedKey === 'signIn') {
      this.showModal();
    } else if (selectedKey === 'signOut') {
      this.signOut();
    }
  }

  signOut() {
    this.setState({ user: { signedIn: false, username: '' } });
  }

  showModal() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    const { showError } = this.props;
    if (!clientId) {
      showError('Missing environment variable GOOGLE_CLIENT_ID');
      return;
    }
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  async signIn() {
    this.hideModal();
    const { showError } = this.props;
    let googleToken;
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      googleToken = googleUser.getAuthResponse().id_token;
    } catch (error) {
      showError(`Error authenticating with Google: ${error.error}`);
    }
    try {
      const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
      const response = await fetch(`${apiEndpoint}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ google_token: googleToken }),
      });
      const body = await response.text();
      const result = JSON.parse(body);
      const { signedIn, name } = result;
      this.setState({ user: { signedIn, username: name } });
    } catch (error) {
      showError(`Error signing into the app: ${error}`);
    }    
  }

  render() {
    const { user } = this.state;
    if (user.signedIn) {
      return (
        <Nav activeKey="1" onSelect={selectedKey => this.onSelect(selectedKey)}>
          <NavDropdown title={user.username} id="user" alignRight>
            <NavDropdown.Item eventKey="signOut">Sign out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }

    const { showing, disabled } = this.state;
    return (
      <>
        <Nav onSelect={selectedKey => this.onSelect(selectedKey)}>
          <Nav.Item>
            <Nav.Link eventKey="signIn">Sign in</Nav.Link>
          </Nav.Item>
        </Nav>
        <Modal keyboard show={showing} onHide={this.hideModal} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button block variant="primary" disabled={disabled} onClick={this.signIn}>
              <img src="https://goo.gl/4yjp6B" alt="Sign In" />
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="link" onClick={this.hideModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withToast(SigninNavItem);
