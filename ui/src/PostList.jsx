import React from 'react';
import { Link } from 'react-router-dom';


function PostRow({ post }) {
  return (
    <tr>
      <td><Link to={`/post/${post._id}`}>{post.title}</Link></td>
      <td>{post.author}</td>
      <td>{post.createdOn.toLocaleString()}</td>
    </tr>
  );
}

export default function PostList({ posts }) {
  const postRows = posts.map(post => (
    <PostRow key={post._id} post={post} />
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
