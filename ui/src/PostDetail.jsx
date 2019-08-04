import React from 'react';

import graphqlFetch from './graphqlFetch.js';

function Comment({ comment }) {
  return (
    <div>
      {comment.author}
      <p>
        {comment.comment}
      </p>
    </div>
  );
}

export default class PostDetail extends React.Component {
  constructor() {
    super();
    this.state = { post: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `
      query post($id: String!) {
        post (id: $id) {
          author
          title
          body
          createdOn
          comments {
            _id
            author
            comment
            createdOn
          }
        }
      }`;

    const data = await graphqlFetch(query, { id });
    if (data) {
      this.setState({ post: data.post });
    } else {
      this.setState({ post: {} });
    }
  }

  render() {
    const { post } = this.state;
    const { comments } = post;
    var commentDom = '';
    if (comments) {
      commentDom = comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ));
    }

    return (
      <div>
        <div>
          <h3>{post.title}</h3>
          <pre>{post.body}</pre>
        </div>
        <div>
          <h3>Comments</h3>
          {commentDom}
        </div>
      </div>
    );
  }
}
