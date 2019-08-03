import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LatestPosts from './LatestPosts.jsx';
import PostDetail from './PostDetail.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function AppRouter() {
  return (
    <Switch>
      <Redirect exact from="/" to="/posts" />
      <Route path="/posts" component={LatestPosts} />
      <Route path="/post/:id" component={PostDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}