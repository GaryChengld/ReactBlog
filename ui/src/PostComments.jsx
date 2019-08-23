import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Row, Col, Form,
} from 'react-bootstrap';

import { HtmlLineBreaks } from './Utils.js';

function Comment({ comment }) {
  const htmlBody = HtmlLineBreaks(comment.comment);
  return (
    <Row>
      <Col md={12}>
        <b>{comment.author}</b>
        {' - '}
        {comment.createdOn.toLocaleString()}
        <br />
        <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
      </Col>
    </Row>
  );
}

export default class PostComments extends React.Component {
  constructor() {
    super();
    this.state = {
      showAddButton: true,
      showForm: false,
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  showForm() {
    this.setState({
      showAddButton: false,
      showForm: true,
      newComment: {
        author: '',
        comment: '',
      },
    });
  }

  hideForm() {
    this.setState({
      showAddButton: true,
      showForm: false,
    });
  }

  isFormValid(newComment) {
    if (newComment.author && newComment.comment) {
      return true;
    }
    return false;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { newComment } = this.state;
    if (this.isFormValid(newComment)) {
      const { addComment } = this.props;
      const data = await addComment(newComment);
      if (data) {
        this.hideForm();
      }
    } else {
      const { showError } = this.props;
      showError('All fields requried, please try again');
    }
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState(prevState => ({
      newComment: { ...prevState.newComment, [name]: value },
    }));
  }

  renderAddButton() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Button variant="primary" size="sm" onClick={this.showForm}>
              Add comment
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="bs-linebreak" />
        </Row>
      </React.Fragment>
    );
  }

  renderForm() {
    const { newComment: { author, comment } } = this.state;
    return (
      <Row>
        <Col md={6}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={author} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows="5" name="comment" value={comment} onChange={this.handleChange} />
            </Form.Group>
            <div className="btn-toolbar">
              <Button type="submit">Submit</Button>
              <Button variant="link" onClick={this.hideForm}>Cancel</Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }

  render() {
    const { post: { comments } } = this.props;
    const { showAddButton, showForm } = this.state;
    let commentsHTML = '';
    if (comments) {
      commentsHTML = comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ));
    }

    return (
      <div>
        <hr />
        <h5>Comments</h5>
        {showAddButton && this.renderAddButton()}
        {showForm && this.renderForm()}
        {commentsHTML}
      </div>
    );
  }
}

PostComments.propTypes = {
  addComment: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
};
