import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import UserContext from './UserContext.js';

function PostCard({ post }) {
  const { user } = useContext(UserContext);
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{post.author}</Card.Title>
        <Card.Text className="mb-2 text-muted">{post.title}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{post.createdOn.toLocaleString()}</small>
      </Card.Footer>
    </Card>
  );
}

export default PostCard;