import React from 'react';
import { Redirect } from 'react-router-dom';
import InputPost from './InputPost.jsx';
import withToast from './withToast.jsx';
import UserContext from './UserContext.js';
import graphqlFetch from './graphqlFetch.js';

class EditPost extends React.Component {
  constructor() {
    super();
    this.state = {};
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
        }
      }`;

    const data = await graphqlFetch(query, { id }, showError);
    if (data) {
      const { post } = data;
      this.setState({ post, saved: false });
    } else {
      this.setState({ post: {}, saved: false });
    }
  }

  async savePost(post) {
  }

  render() {
    const { post, saved } = this.state;
    const { showError } = this.props;
    const title = 'Modify Post';
    if (post && saved) {
      const redirectPath = `/post/${post._id}`;
      return <Redirect to={redirectPath} />;
    } else if (post) {
      return (
        <InputPost title={title} post={post} savePost={this.savePost} showError={showError} />
      );
    }
    return '';
  }
}

const EditPostWithToast = withToast(EditPost);
export default EditPostWithToast;
