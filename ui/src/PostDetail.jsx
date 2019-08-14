import React from 'react';

import PostComments from './PostComments.jsx';
import graphqlFetch from './graphqlFetch.js';
import Utils from './Utils.js';

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

  async addComment(newComment) {
    const { match: { params: { id } } } = this.props;
    const query = `mutation addComment( 
      $postId: String!
      $comment: CommentInputs!) {
      addComment(
          postId: $postId
          comment: $comment
      )
      {
        _id
        author
        comment
        createdOn
      }
    }`;
    const data = await graphqlFetch(query, { postId: id, comment: newComment });
    if (data) {
      const { addComment } = data;
      const { post } = this.state;
      const comments = post.comments.slice(0);
      comments.unshift(addComment);
      post.comments = comments;
      this.setState({ post });
    }
    return data;
  }

  render() {
    const { post } = this.state;
    const htmlBody = post.body ? Utils.HtmlLineBreaks(post.body) : '';
    return (
      <div>
        <div>
          <h4>{post.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
        </div>
        {post ? (<PostComments post={post} addComment={this.addComment} />) : (null)}
      </div>
    );
  }
}
