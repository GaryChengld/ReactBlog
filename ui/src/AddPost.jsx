import React from 'react';
import { Redirect } from 'react-router-dom'
import InputPost from './InputPost.jsx'
import withToast from './withToast.jsx';
import UserContext from './UserContext.js';
import graphqlFetch from './graphqlFetch.js';

class AddPost extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.savePost = this.savePost.bind(this);
  }

  async savePost(post) {
    const { showError } = this.props;
    const query = `mutation addPost($post: PostInputs!) {
        addPost(post: $post)
        {
          _id        
        }
      }`;

    const data = await graphqlFetch(query, { post: post }, showError);
    if (data) {
      const { addPost } = data;
      this.setState({ newPostId: addPost._id });
    }
    return data;
  }

  render() {
    const { newPostId } = this.state;
    const { showError } = this.props;
    const post = {
      title: '',
      body: '',
    }
    const title = 'Add Post'
    if (newPostId) {
      const redirectPath = `/post/${newPostId}`;
      return <Redirect to={redirectPath} />;
    }
    return (
      <InputPost title={title} post={post} savePost={this.savePost} showError={showError} />
    );
  }
}

const AddPostWithToast = withToast(AddPost);
AddPostWithToast.contextType = UserContext;
export default AddPostWithToast;
