import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LatestPosts from './LatestPosts.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={LatestPosts} />
      <Route component={NotFound} />
    </Switch>
  );
}
