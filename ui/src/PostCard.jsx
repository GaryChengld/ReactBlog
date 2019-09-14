import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import TimeAgo from 'react-timeago'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import UserContext from './UserContext.js';

export default class PostCard extends React.Component {
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
              <TimeAgo date={post.createdOn.toLocaleString()} />
            </small>
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

PostCard.contextType = UserContext;
