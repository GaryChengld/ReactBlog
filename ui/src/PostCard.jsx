import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';
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
            <small className="text-muted">{post.createdOn.toLocaleString()}</small>
            <Button variant="primary" size="sm">Edit</Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

PostCard.contextType = UserContext;
