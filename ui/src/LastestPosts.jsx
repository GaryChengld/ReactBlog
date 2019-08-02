import React from 'react';

import PostList from './PostList.jsx';

// import graphqlFetch from './graphqlFetch.js';

export default class LastestPosts extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PostList />
      </React.Fragment>
    );
  }
}
