import React from 'react';
import './Header.css';
import LoginButton from './LoginButton.js';
import SignUpButton from './SignUpButton.js';

function Header() {
  return (
    <div className="Header">
      <span> Welcome! This is my placeholder Header. It's just me playing around with flexbox. The buttons unfortunately do nothing at the moment! </span>
      <span className="push">
        <LoginButton text="Log in here!" />
        <SignUpButton text="Sign up here!" />
      </span>
    </div>
  );
}

export default Header;