import React from 'react';
import { Row, Col } from 'react-bootstrap';

import PostComments from './PostComments.jsx';
import graphqlFetch from './graphqlFetch.js';
import { HtmlLineBreaks } from './Utils.js';
import withToast from './withToast.jsx';

class PostDetail extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const {
      showError,
      match: { params: { id } },
    } = this.props;
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

    const data = await graphqlFetch(query, { id }, showError);
    if (data) {
      const { post } = data;
      post.comments.sort((a, b) => (a.createdOn > b.createdOn ? -1
        : a.createdOn < b.createdOn ? 1 : 0));
      this.setState({ post });
    } else {      
      this.setState({ post: undefined });
    }
  }

  async addComment(newComment) {
    const {
      showError,
      match: { params: { id } },
    } = this.props;
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

    const data = await graphqlFetch(query, { postId: id, comment: newComment }, showError);
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
    const { showError } = this.props;
    const { post } = this.state;
    if (post) {
      const htmlBody = HtmlLineBreaks(post.body);
      return (
        <>
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
          <PostComments post={post} addComment={this.addComment} showError={showError} />
        </>
      );
    }
    return '';
  }
}

const PostDetailWithToast = withToast(PostDetail);
export default PostDetailWithToast;
