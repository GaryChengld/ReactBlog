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
    this.savePost = this.savePost.bind(this);
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
          _id
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
      this.showError("Post not found");
      this.setState({ post: undefined, saved: false });
    }
  }

  async savePost(post) {
    const { showError } = this.props;
    const postInputs = {
      title: post.title,
      body: post.body,
    };
    const query = `mutation updatePost($id: String!, $post: PostInputs!) {
        updatePost(id: $id, post: $post)
        {
          _id                  
        }
      }`;
    const { _id: id } = post;
    const data = await graphqlFetch(query, { id, post: postInputs }, showError);
    if (data) {
      this.setState({ post, saved: true });
    }
    return data;
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
