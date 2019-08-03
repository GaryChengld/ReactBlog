import React from 'react';

function PostRow({ post }) {
  return (
    <tr>
      <td>{post.title}</td>
      <td>{post.author}</td>
      <td>{post.createdOn.toDateString()}</td>
    </tr>
  );
}

export default function PostList({ posts }) {
  const postRows = posts.map(post => (
    <PostRow key={post.id} post={post} />
  ));
  return (
    <table className="bordered-table">
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
    </table>
  );
}
