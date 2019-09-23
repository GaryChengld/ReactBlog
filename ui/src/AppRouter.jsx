import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LatestPosts from './LatestPosts.jsx';
import PostDetail from './PostDetail.jsx';
import AddPost from './AddPost.jsx';
import EditPost from './EditPost.jsx';
import SearchPosts from './SearchPosts.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function AppRouter() {
  return (
    <Switch>
      <Redirect exact from="/" to="/posts" />
      <Route path="/posts" component={LatestPosts} />
      <Route path="/post/:id" component={PostDetail} />
      <Route path="/searchPosts/:text" component={SearchPosts} />
      <Route path="/addPost" component={AddPost} />
      <Route path="/editPost/:id" component={EditPost} />
      <Route component={NotFound} />
    </Switch>
  );
}
