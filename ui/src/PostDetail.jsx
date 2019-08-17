import React from 'react';
import { Row, Col } from 'react-bootstrap';

import PostComments from './PostComments.jsx';
import graphqlFetch from './graphqlFetch.js';
import { HtmlLineBreaks } from './Utils.js';
import Toast from './Toast.jsx';

export default class PostDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      post: {},
      toastMessage: '',
    };
    this.addComment = this.addComment.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  showError(message) {
    this.setState({ toastMessage: message });
    this.refs.toast.showError();
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
    const { toastMessage } = this.state;
    const htmlBody = HtmlLineBreaks(post.body);
    return (
      <React.Fragment>
        <Row>
          <Col>
            <h4>{post.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: htmlBody }} className="bg-light" />
          </Col>
        </Row>
        {post ? (<PostComments post={post} addComment={this.addComment} showError={this.showError} />) : (null)}
        <Toast ref="toast">
          {toastMessage}
        </Toast>
      </React.Fragment>
    );
  }
}
