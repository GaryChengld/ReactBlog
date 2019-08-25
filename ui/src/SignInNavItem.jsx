import React from 'react';
import {
  Nav, Modal, Button, NavDropdown, MenuItem,
} from 'react-bootstrap';

export default class SigninNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      user: { signedIn: false, username: '' },
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  signIn() {
    this.hideModal();
    this.setState({ user: { signedIn: true, username: 'User1' } });
  }

  signOut() {
    this.setState({ user: { signedIn: false, username: '' } });
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  onSelect(selectedKey) {
    if (selectedKey === 'signIn') {
      alert("signin");
      this.signIn();
    }
  }

  render() {
    return (
      <Nav onSelect={selectedKey => this.onSelect(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey="signIn">Sign in</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}