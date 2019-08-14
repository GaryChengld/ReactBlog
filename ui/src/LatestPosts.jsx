import React from 'react';

import PostList from './PostList.jsx';
import graphqlFetch from './graphqlFetch.js';

export default class LatestPosts extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      postList(limit: 10) {
          _id
          author
          title
          createdOn
        }
    }`;

    const data = await graphqlFetch(query);
    if (data) {
      this.setState({ posts: data.postList });
    }
  }

  render() {
    const { posts } = this.state;
    return (
      <React.Fragment>
        <PostList posts={posts} />
      </React.Fragment>
    );
  }
}
