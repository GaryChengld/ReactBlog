import React from 'react';

import PostList from './PostList.jsx';
import graphqlFetch from './graphqlFetch.js';

export default class SearchPosts extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const {
      match: { params: { text } },
    } = this.props;

    const query = `query {
      postList(limit: 12) {
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
      <>
        <PostList posts={posts} loadData={this.loadData} />
      </>
    );
  }
}
