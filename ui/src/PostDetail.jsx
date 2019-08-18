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
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
    };
    this.addComment = this.addComment.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
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

    const data = await graphqlFetch(query, { id }, this.showError);
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

    const data = await graphqlFetch(query, { postId: id, comment: newComment }, this.showError);
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
    const { toastVisible, toastType, toastMessage } = this.state;
    if (post) {
      const htmlBody = HtmlLineBreaks(post.body);
      return (
        <React.Fragment>
          <Row>
            <Col>
              <h4>{post.title}</h4>
              <p>
                Author: {post.author}<br />
                Date: {post.createdOn.toLocaleString()}
              </p>
              <div dangerouslySetInnerHTML={{ __html: htmlBody }} className="bg-light" />
            </Col>
          </Row>
          <PostComments post={post} addComment={this.addComment} showError={this.showError} />
          <Toast showing={toastVisible} variant={toastType} onDismiss={this.dismissToast}>
            {toastMessage}
          </Toast>
        </React.Fragment>
      );
    }
    return '';
  }
}
