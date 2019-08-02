import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LastestPosts from './LastestPosts.jsx'

const NotFound = () => <h1>Page Not Found</h1>;

export default function AppRouting() {
  return (
    <Switch>      
      <Route path="/" component={LastestPosts} />      
      <Route component={NotFound} />
    </Switch>
  );
}
