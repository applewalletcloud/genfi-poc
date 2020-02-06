import React from "react";
import "./ForumNavBar.css";
import Button from 'react-bootstrap/Button';
import * as actions from './redux/actions/facebookUserAuthActions.js'
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';

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

	async loginWithGoogle(){

	}

	async loginWithFacebook(){

		this.dispatch(actions.getSessionToken)
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
				

				
				{
					this.props.isAuthenticated ?
					<>
						<p>"is authenticated " + {this.props.token}</p>
						<span className="push-right">
							<Button className="LoginButton" variant="outline-primary">{"Logout"}</Button>
							<GoogleLogin className="push-right"
						          clientId="608003919007-o4s5bgjmms2hm378fdnatj15qhcsa15g.apps.googleusercontent.com"
						          buttonText="LOGOUT"
						          onSuccess={(response) => {
						              	this.completeLoginWithDjango(response.profileObj)
						  		}}// need to store this login data somewhere
						          onFailure={(response) => {
						      console.log(response);}}
						        />
					    </span>
					</>
					:
					<>
						<p>{"not authenticated " + this.props.token}</p>
						<span className="push-right">
						<Button className="LoginButton" type="google" variant="outline-primary" >{"Login with Google"}</Button>
						<Button className="LoginButton" type="facebook" variant="outline-primary" >{"Login with Facebook"}</Button>
					    </span>
					</>
				}
				

		    </div>
			
		);
	}

}


const mapStateToProps = state => ({
	token: state.facebookUserAuth.token,
	
})



export default connect(mapStateToProps)(ForumNavBar);


