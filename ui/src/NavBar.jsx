import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
    </nav>
  );
}
