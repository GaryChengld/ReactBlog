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
    };
    this.showForm = this.showForm.bind(this);
  }

  showForm() {
    this.setState({
      showAddButton: false,
      showForm: true,
    });
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
        {commentsDOM}
      </div>
    );
  }
}
