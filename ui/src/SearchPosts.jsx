import React from 'react';
import URLSearchParams from 'url-search-params';

import PostList from './PostList.jsx';
import graphqlFetch from './graphqlFetch.js';
import withToast from './withToast.jsx';

class SearchPosts extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async loadData() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const text = params.get('text');

    const query = `query {
      searchPosts(text: "${text}") {
          _id
          author
          title
          createdOn
        }
    }`;

    const data = await graphqlFetch(query, {}, this.showError);
    if (data) {
      this.setState({ posts: data.searchPosts });
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

const SearchPostsToast = withToast(SearchPosts);
export default SearchPostsToast;
