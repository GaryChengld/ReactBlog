import React from 'react';
import { Row, Container } from 'react-bootstrap';
import PostCard from './PostCard.jsx';
import graphqlFetch from './graphqlFetch.js';
import withToast from './withToast.jsx';

class PostList extends React.Component {
  constructor() {
    super();
    this.deletePost = this.deletePost.bind(this);
  }

  async deletePost(post) {
    const id = post._id;
    const { loadData, showError } = this.props;
    const query = `mutation removePost($id: String!) {
      removePost(id: $id)        
    }`;
    const data = await graphqlFetch(query, { id }, showError);
    loadData();
    return data;
  }

  render() {
    const { posts } = this.props;
    const postCards = posts.map(post => (
      <PostCard key={post._id} post={post} deletePost={this.deletePost} />
    ));
    return (
      <Container>
        <Row>
          {postCards}
        </Row>
      </Container>
    );
  }
}

export default withToast(PostList);
