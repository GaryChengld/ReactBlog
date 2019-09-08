import React from 'react';
import InputPost from './InputPost.jsx'
import withToast from './withToast.jsx';

class AddPost extends React.Component {
  render() {
    const { showError } = this.props;
    const post = {
      title: '',
      body: '',
    }
    const title = 'Add Post'
    return (
      <InputPost title={title} post={post} showError={showError} />
    );
  }
}

const AddPostWithToast = withToast(AddPost);
export default AddPostWithToast;
