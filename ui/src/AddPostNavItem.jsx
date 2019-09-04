import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

class AddPostNavItem extends React.Component {
  render() {
    const { user: { signedIn } } = this.props;
    if (signedIn) {
      return (
        <Nav>
          <Nav.Item>
            <Nav.Link href="/addPost">
              <FontAwesomeIcon icon={faFile} title="add post" />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      );
    }
    return '';
  }
}

export default AddPostNavItem;
