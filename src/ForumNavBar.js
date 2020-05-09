import React from "react";
import "./ForumNavBar.css";
import Button from 'react-bootstrap/Button';
import * as actions from './redux/actions/forumUserAuthActions.js';
import { connect } from 'react-redux';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';


// The two lines below aren't comments, but global variables for the use of social login
/* global FB */
/* global gapi */
require("regenerator-runtime/runtime"); // put this here for jest



export class ForumNavBar extends React.Component {
	constructor(props) {
		super(props);
		this.completeLoginWithDjango = this.completeLoginWithDjango.bind(this);
		this.loadGoogleApi = this.loadGoogleApi.bind(this);
		this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
		this.state = {
			user: "not yet updated",
		}
	}

	componentDidMount(){
		this.loadGoogleApi();
        this.loadFbLoginApi();
	}

	loadFbLoginApi() {

		window.fbAsyncInit = function() {
		  FB.init({
		    appId      : '186492402430643', // TODO: Put your app ID here
		    cookie     : true,
		    xfbml      : true,
		    version    : 'v6.0'
		  });
		    
		  FB.AppEvents.logPageView();   
		    
		};

		(function(d, s, id){
		   var js, fjs = d.getElementsByTagName(s)[0];
		   console.log(s);
		   console.log("get element bytag name in fb above");
		   if (d.getElementById(id)) {return;}
		   js = d.createElement(s); js.id = id;
		   js.src = "https://connect.facebook.net/en_US/sdk.js";
		   if (fjs != undefined){
		   	  fjs.parentNode.insertBefore(js, fjs);
		   }
		   
		 }(document, 'script', 'facebook-jssdk'));
    }


    /** 
	Necessary function that loads google script for social login. called on component did mount
    **/
    loadGoogleApi() {
        const script = document.createElement("script");
	    script.src = "https://apis.google.com/js/platform.js";
	    script.async = true;
	    document.body.appendChild(script);
	    return document.body // may need to delete this line
    }

	async loginWithGoogle(){

	}

	async loginWithFacebook(){

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
				
				{
					this.props.isAuthenticated 
					?
					<>
						<span className="push-right">
							<Button className="LoginButton" variant="outline-primary">{"Logout"}</Button>
					    </span>
					</>
					:
					<>
						<span className="push-right">
						<Link to="/login"><Button className="LoginButton" variant="outline-primary" >{"Login"}</Button></Link>
						<Link to="/signup"><Button className="LoginButton" variant="outline-primary" >{"Sign Up"}</Button></Link>
					    </span>
					</>
				}
				

		    </div>
			
		);
	}

}


const mapStateToProps = state => ({
	token: state.forumUserAuth.token,
	user: state.forumUserAuth.user,
})



export default connect(mapStateToProps)(ForumNavBar);


