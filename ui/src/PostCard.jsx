import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Card, Col } from 'react-bootstrap';
import UserContext from './UserContext.js';

function PostCard({ post }) {
  const { user } = useContext(UserContext);
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
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default PostCard;