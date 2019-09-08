import React from 'react';
import withToast from './withToast.jsx';

class EditPost extends React.Component {
  render() {
    return (
      <h3>Update Post</h3>
    );
  }
}

const EditPostWithToast = withToast(EditPost);
export default EditPostWithToast;
