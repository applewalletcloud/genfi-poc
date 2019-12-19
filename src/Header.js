import React from 'react';
import './Header.css';
import LoginButton from './LoginButton.js';
import SignUpButton from './SignUpButton.js';
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';





class Header extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		mylogincookie: "not yet set",
  		mylogoutcookie: "not yet set",
  	};
  	this.login = this.login.bind(this);
  	this.logout = this.logout.bind(this);
  	this.printState = this.printState.bind(this);

  }

  login(response){
	this.setState({
		mylogincookie: response,
	})
  }
  logout(response){
	this.setState({
		mylogoutcookie: response,
	})

  }
  printState(){
  	alert(this.state.mylogincookie);
  	console.log(this.state.mylogincookie);
  	console.log(this.state.mylogoutcookie);
  }

  render() { 
  	return (
		<div className="Header">
		  <div>
		      <span> Welcome! This is my placeholder Header. It's just me playing around with flexbox. The buttons unfortunately do nothing at the moment! There's a google sign in button, which actually works! But it's not very significant at the moment. </span>
		      <span className="push">
		        <LoginButton text="Log in here!" />
		        <SignUpButton text="Sign up here!" />
		      </span>
		      <div> {this.state.mylogincookie[0]} </div>
		  </div>
		  <div>
		      <GoogleLogin
		          clientId="608003919007-o4s5bgjmms2hm378fdnatj15qhcsa15g.apps.googleusercontent.com"
		          buttonText="LOGIN WITH GOOGLE"
		          onSuccess={(response) => {
		              this.login(response);

		  		}}// need to store this login data somewhere
		          onFailure={(response) => {
		      console.log(response);}}
		        />
		        <GoogleLogout
		          clientId="608003919007-o4s5bgjmms2hm378fdnatj15qhcsa15g.apps.googleusercontent.com"
			      buttonText="LOGOUT"
			      onLogoutSuccess={(response) => {
		      		this.logout(response);
		  		}}
			    >
			    </GoogleLogout>
			    <button onClick={this.printState}>should print state</button>
		  </div>

		</div>
		);
	}
}

export default Header;