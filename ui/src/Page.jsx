import React from 'react';
import { NavLink } from 'react-router-dom';

import AppRouting from './AppRouting.jsx';

function NavBar() {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
    </nav>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <AppRouting />
    </div>
  );
}
