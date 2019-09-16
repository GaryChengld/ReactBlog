import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Card, Col } from 'react-bootstrap';
import TimeAgo from 'react-timeago'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import UserContext from './UserContext.js';

export default class PostCard extends React.Component {

  constructor() {
    super();
    this.renderMoreAction = this.renderMoreAction.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const { post, deletePost } = this.props;
    deletePost(post);
  }

  renderMoreAction() {
    const { post } = this.props;
    const user = this.context;
    if (user && user.signedIn && post.author === user.username) {
      return (
        <Dropdown className="float-right">
          <Dropdown.Toggle variant="light" id="dropdown-basic" className="btn-sm" bsPrefix>
            <FontAwesomeIcon icon={faEllipsisH} title="more action" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
            <Dropdown.Item onClick={this.onDelete}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    return '';
  }

  render() {
    const { post } = this.props;
    const user = this.context;
    const linkTo = `/post/${post._id}`;
    return (
      <Col lg={4} className="py-2">
        <Card className="h-100">
          <Card.Body>
            <Card.Title>
              {post.author}
            </Card.Title>
            <Link to={linkTo}>
              <Card.Text className="mb-2 text-muted">{post.title}</Card.Text>
            </Link>
          </Card.Body>
          <Card.Footer>
            <small>
              Posted{' '}<TimeAgo date={post.createdOn.toLocaleString()} />
            </small>
            {this.renderMoreAction()}
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

PostCard.contextType = UserContext;
