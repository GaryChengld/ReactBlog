import React from 'react';

import NavBar from './NavBar.jsx';
import AppRouter from './AppRouter.jsx';

export default function Page() {
  return (
    <div>
      <NavBar />
      <div className="container content">
        <AppRouter />
      </div>
    </div>
  );
}
