import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const activeStyle = {
    fontSize: '1.5rem'
  };

  return (
    <ul>
      <li><NavLink exact to='/' activeStyle={activeStyle}>Home</NavLink></li>
      <li><NavLink exact to='/about' activeStyle={activeStyle}>Music</NavLink></li>
    </ul>
  );
};

export default Navigation;
