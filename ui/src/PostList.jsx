import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { CardColumns } from 'react-bootstrap';
import PostCard from './PostCard.jsx'

function PostRow({ post }) {
  const selectLocation = { pathname: `/post/${post._id}` };
  return (
    <LinkContainer to={selectLocation}>
      <tr>
        <td>{post.title}</td>
        <td>{post.author}</td>
        <td>{post.createdOn.toLocaleString()}</td>
      </tr>
    </LinkContainer>
  );
}

export default function PostList({ posts }) {
  const postCards = posts.map(post => (
    <PostCard key={post._id} post={post} />
  ));
  return (
    <CardColumns>
      {postCards}
    </CardColumns>
  );
}
