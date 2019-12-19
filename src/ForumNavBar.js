import React from "react";
import "./ForumNavBar.css";
import Button from 'react-bootstrap/Button';

import GoogleLogin from 'react-google-login';

function ForumNavBar(props){
	return (
		
		<div className="nav-bar">
			<div className="nav-child">Main</div>
			<div className="nav-child">My Profile</div>
			<div className="nav-child">Etc</div>
			<GoogleLogin className="push-right"
		          clientId="608003919007-o4s5bgjmms2hm378fdnatj15qhcsa15g.apps.googleusercontent.com"
		          buttonText="LOGIN WITH GOOGLE"
		          onSuccess={(response) => {
		              console.log(response);

		  		}}// need to store this login data somewhere
		          onFailure={(response) => {
		      console.log(response);}}
		        />
	    </div>
		
	);
}

export default ForumNavBar;