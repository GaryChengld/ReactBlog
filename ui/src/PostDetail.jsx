import React from 'react';

import PostComments from './PostComments.jsx';
import graphqlFetch from './graphqlFetch.js';

export default class PostDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      post: {},
    };
    this.addComment = this.addComment.bind(this);
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
      const { post } = data;
      post.comments.sort((a, b) => (a.createdOn > b.createdOn
        ? -1 : a.createdOn < b.createdOn ? 1 : 0));
      this.setState({ post });
    } else {
      this.setState({ post: {} });
    }
  }

  async addComment(comment) {
    
  }

  render() {
    const { post } = this.state;
    return (
      <div>
        <div>
          <h3>{post.title}</h3>
          <pre>{post.body}</pre>
        </div>
        {post ? (<PostComments post={post} addComment={this.addComment} />) : (null)}
      </div>
    );
  }
}
