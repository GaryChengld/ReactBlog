import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table } from 'react-bootstrap';

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
  const postRows = posts.map(post => (
    <PostRow key={post._id} post={post} />
  ));
  return (
    <Table bordered hover responsive size="sm">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {postRows}
      </tbody>
    </Table>
  );
}
