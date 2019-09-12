import React from 'react';
import { Row, Container } from 'react-bootstrap';
import PostCard from './PostCard.jsx'

export default function PostList({ posts }) {
  const postCards = posts.map(post => (
    <PostCard key={post._id} post={post} />
  ));
  return (
    <Container>
      <Row>
        {postCards}
      </Row>
    </Container>
  );
}
