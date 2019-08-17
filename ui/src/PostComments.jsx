import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

function Comment({ comment }) {
  return (
    <Row>
      <Col>
        <b>{comment.author}</b>
        {' - '}
        {comment.createdOn.toLocaleString()}
        <br />
        {comment.comment}
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
      <div>
        <div>
          <button type="button" onClick={this.showForm}>
            Add comment
          </button>
        </div>
        <br />
      </div>
    );
  }

  renderForm() {
    const { newComment: { author, comment } } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="author">Author:
            <br />
            <input type="text" name="author" value={author} onChange={this.handleChange} />
          </label>
          <br />
          <label htmlFor="comment">Comment:
            <br />
            <textarea name="comment" value={comment} onChange={this.handleChange} rows="10" cols="80" />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <br />
      </React.Fragment>
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
