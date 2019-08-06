import React from 'react';

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
      newComment: {
        author: '',
        comment: '',
      },
    };
    this.showForm = this.showForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showForm() {
    this.setState({
      showAddButton: false,
      showForm: true,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { newComment } = this.state;
    console.log(newComment);
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    let { newComment } = this.state;
    newComment[name] = value;
    this.setState({ newComment });
  }

  renderAddButton() {
    const { showAddButton } = this.state;
    if (showAddButton) {
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
    return null;
  }

  renderForm() {
    const { showForm } = this.state;
    const { newComment: { author, comment } } = this.state;

    if (showForm) {
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
    return null;
  }

  render() {
    const { post: { comments } } = this.props;
    let commentsDOM = '';
    if (comments) {
      comments.sort((a, b) => (a.createdOn > b.createdOn ? -1 : a.createdOn < b.createdOn ? 1 : 0));
      commentsDOM = comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ));
    }

    return (
      <div>
        <h3>Comments</h3>
        {this.renderAddButton()}
        {this.renderForm()}
        {commentsDOM}
      </div>
    );
  }
}
