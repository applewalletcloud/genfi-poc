import React from 'react';
import './Header.css';
import LoginButton from './LoginButton.js';
import SignUpButton from './SignUpButton.js';
import GoogleLogin from 'react-google-login';

function Header() {
  return (
    <div className="Header">
      <div>
	      <span> Welcome! This is my placeholder Header. It's just me playing around with flexbox. The buttons unfortunately do nothing at the moment! There's a google sign in button, which actually works! But it's not very significant at the moment. </span>
	      <span className="push">
	        <LoginButton text="Log in here!" />
	        <SignUpButton text="Sign up here!" />
	      </span>
      </div>
      <div>
	      <GoogleLogin
	          clientId="608003919007-o4s5bgjmms2hm378fdnatj15qhcsa15g.apps.googleusercontent.com"
	          buttonText="LOGIN WITH GOOGLE"
	          onSuccess={(response) => {
	      console.log(response);}}
	          onFailure={(response) => {
	      console.log(response);}}
	        />
      </div>
    </div>
  );
}

export default Header;