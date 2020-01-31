import React from "react";
import "./ForumNavBar.css";
import Button from 'react-bootstrap/Button';

import GoogleLogin from 'react-google-login';



class ForumNavBar extends React.Component {
	constructor(props) {
		super(props);
		this.completeLoginWithDjango = this.completeLoginWithDjango.bind(this);
		this.state = {
			user: "not yet updated",
		}
	}

	componentDidMount(){

	}
	
	async completeLoginWithDjango(profile){
		//console.log(profile)
		//console.log("profile is above")
		// see if this account already has a django user
		let api_endpoint = "http://localhost:8000/quizbank/forumUser/"+profile.email+"/?format=json"
		let result = await fetch(api_endpoint).then(res => res.json())
		
		if (result["user"] == "user not found"){
			console.log("dope now we make a new user")
			// now we need to make a post request to create a new user

		}

		
		
		console.log("result is above")
		return result
	}

	render() {
		return (
			
			<div className="nav-bar">
				<div className="nav-child">Main</div>
				<div className="nav-child">My Profile</div>
				<div className="nav-child">Etc</div>
				<div> {this.props.isAuthenticated}</div>
				{
					this.props.isAuthenticated ?
					<div> "we are authenticated" </div>
					:
					<>
					<div> "we are not authenticated" </div>
					<div> {this.props.test2}</div>
					</>
				}
				
				<div> "test" </div>
				<GoogleLogin className="push-right"
			          clientId="608003919007-o4s5bgjmms2hm378fdnatj15qhcsa15g.apps.googleusercontent.com"
			          buttonText="LOGIN WITH GOOGLE"
			          onSuccess={(response) => {
			              	this.completeLoginWithDjango(response.profileObj)
			  		}}// need to store this login data somewhere
			          onFailure={(response) => {
			      console.log(response);}}
			        />
		    </div>
			
		);
	}

}

export default ForumNavBar;