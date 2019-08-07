import React from 'react';
import PropTypes from 'prop-types';

function Comment({ comment }) {
  return (
    <div>
      <div>
        <b>{comment.author}</b>
        &nbsp;-&nbsp;
        {comment.createdOn.toLocaleString()}
        <br />
        {comment.comment}
      </div>
      <br />
    </div>
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
      errorMessage: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { newComment } = this.state;
    if (this.formIsValid(newComment)) {
      const { addComment } = this.props;
      addComment(newComment);
      this.hideForm();
    } else {
      this.setState({ errorMessage: 'All fields requried, please try again' });
    }
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    let { newComment } = this.state;
    newComment[name] = value;
    this.setState({ newComment });
  }

  formIsValid(newComment) {
    if (newComment.author && newComment.comment) {
      return true;
    } else {
      return false;
    }
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
    const { newComment: { author, comment }, errorMessage } = this.state;
    return (
      <React.Fragment>
        {errorMessage && (<div><b>{errorMessage}</b><br /></div>)}
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
    const { showAddButton, showForm, errorMessage } = this.state;
    let commentsHTML = '';
    if (comments) {
      commentsHTML = comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ));
    }

    return (
      <div>
        <h3>Comments</h3>
        {showAddButton && this.renderAddButton()}
        {showForm && this.renderForm()}
        {commentsHTML}
      </div>
    );
  }
}

PostComments.propTypes = {
  addComment: PropTypes.func.isRequired,
};
