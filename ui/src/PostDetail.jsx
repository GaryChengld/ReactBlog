import React from 'react';

import graphqlFetch from './graphqlFetch.js';

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

export default class PostDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      post: {},
      addCommentButton: true,
      addCommentForm: false,
    };
    this.showAddCommentForm = this.showAddCommentForm.bind(this);
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
      this.setState({ post: data.post });
    } else {
      this.setState({ post: {} });
    }
  }

  showAddCommentForm() {
    this.setState({
      addCommentButton: false,
      addCommentForm: true,
    });
  }

  renderAddCommentButton() {
    const { addCommentButton } = this.state;
    if (addCommentButton) {
      return (
        <div>
          <div>
            <button type="button" onClick={this.showAddCommentForm}>
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
    const { post } = this.state;
    const { comments } = post;
    let commentDOM = '';
    if (comments) {
      comments.sort((a, b) => (a.createdOn > b.createdOn ? -1 : a.createdOn < b.createdOn ? 1 : 0));
      commentDOM = comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ));
    }

    return (
      <div>
        <div>
          <h3>{post.title}</h3>
          <pre>{post.body}</pre>
        </div>
        <div>
          <h3>Comments</h3>
          {this.renderAddCommentButton()}
          {commentDOM}
        </div>
      </div>
    );
  }
}
