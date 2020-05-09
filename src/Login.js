import React from 'react';
import { NavLink } from 'react-router-dom';

// styles
import "./Login.css"

// The two lines below aren't comments, but global variables for the use of social login
/* global FB */
/* global gapi */

import { loadAuth2 } from 'gapi-script'

import { GoogleLogin } from 'react-google-login';
import { GoogleAuthorize } from 'react-google-authorize';
import FacebookLogin from 'react-facebook-login';

// redux imports
import { connect } from 'react-redux';
import * as actions from './redux//actions/forumUserAuthActions.js';

import {$, jQuery} from 'jquery';

// UI imports
import { Form, Icon, Input, Button, Spin } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;



export class NormalLoginForm extends React.Component {


	constructor(props) {
		super(props);
		this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
	    this.responseFacebook = this.responseFacebook.bind(this);
	    this.testGoogleLogin = this.testGoogleLogin.bind(this);
		this.state = {
			user: "not yet updated",
		}
	}

	componentDidMount(){
		this.testLogin = this.testLogin.bind(this);
	    this.fbLogout = this.fbLogout.bind(this);
        this.loadFbLoginApi();
	}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Need to delete: Received values of form: ', values);
      	const result = this.props.onAuth(values.username, values.password);
      	// TODO: can try a try-catch block to see if a promise is being rejected
      	// ^ note that there's a workaround for this that's currently implemented
      } 
    });
   
  };

  loadFbLoginApi() {
  		console.log("we re loading the fb api in the login component")
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

    responseFacebook(response) {
    	console.log(response);
    	console.log("we just completed the facebook login and this is the callback");
    	console.log(response["accessToken"]);
    	console.log("access token is above");
    	// now we want to see if we can check a django token from the backend
    	this.props.socialLogin("facebook", response["accessToken"]);
    	console.log("just finished social login call")
    }



        // TODO: DELETE AFTER DONE TESTING
    testGoogleLogin(googleUser) {
    	this.setState({
	      googleUser: googleUser
    	})
    	console.log("printing the google user!")
    	console.log(this.state.googleUser);
    	console.log("why is it empty?");
    	console.log("printing gapi stuff right below");
    	let instance = gapi.auth2.getAuthInstance();
    	console.log(instance.isSignedIn.get());

    }

    testLogin() {
    	console.log("WE HAVE ENTERED THE TEST LOGIN FUNCTION")
	    FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
			    var accessToken = response.authResponse.accessToken;
			    console.log("THE ACCESS TOKEN IS HERE!!! HAVE WE FOUND IT ?!?!?! -------");
			    

			    console.log(accessToken);
			   
			} else{
			console.log("looks like there's no connection")

			}

		} );
	}

	/**
	Logs user out of fb
	**/
	fbLogout() {
    	FB.logout()
    }

    /**
	Calls the FB api to create a window for social login
    **/
    facebookLogin(){

    	// call the fb login function
    	// if the user is already logged in, they will log in with the current account
    	FB.login(function(response) {

    		// if the user logs in via fb
		    if (response.authResponse) {
		     	// redirect to the forum home page
                window.top.location.href="https://localhost:3000/forum";
                   
		    } else {
		    	// I believe the else case is covered gracefully by the api
		     	console.log('User cancelled login or did not fully authorize.');
		    }
		})
    }

    /**
    Loads the google api and logs the user out
    **/
    async googleLogout(){
    	let instance = await loadAuth2("243107404278-152ffjsf5nh5niktchl60vol4i2rg7k6.apps.googleusercontent.com", 'profile email');
		instance.signOut()
    }

    /**
    Loads the google api then prompts the user to log in
    **/
    async googleLogin() {
    	// load the google api to call sign in
    	// we use the await approach to avoid getting a null object for gapi 
		let instance = await loadAuth2("243107404278-152ffjsf5nh5niktchl60vol4i2rg7k6.apps.googleusercontent.com", 'profile email');
		
		// opens the sign in options for the client
		instance.signIn()
		.then((res) => {
			// in this case we've logged in, we want to redirect to the main forum page
			window.top.location.href="https://localhost:3000/forum";
		})

		// i believe the api handles the failure cases and we don't want to change webpages should the sign in fail
	        	
    }



  render() {
    const { getFieldDecorator } = this.props.form;
    console.log("we re-render the login component");
    console.log(this.props.token);
    if (this.props.token){
    	console.log("we enter here and our token is: ");
    	console.log(this.props.token);
    	this.props.history.push('/forum');
    }
    let userLoginMessage = "Please enter your login info below:"
    if (this.props.error) {
    	userLoginMessage = this.props.error
	}
    return (
    	<div class="login-page-container">
    	{userLoginMessage}
    	{

    		this.props.loading ?

			<Spin indicator={antIcon} />

    		:
    		<>
	      <Form onSubmit={this.handleSubmit} className="login-form">
	        <Form.Item>
	          {getFieldDecorator('username', {
	            rules: [{ required: true, message: 'Please input your username!' }],
	          })(
	            <Input
	              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
	              placeholder="Username"
	            />,
	          )}
	        </Form.Item>
	        <Form.Item>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: 'Please input your Password!' }],
	          })(
	            <Input
	              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
	              type="password"
	              placeholder="Password"
	            />,
	          )}
	        </Form.Item>
	        <Form.Item className="center-items">
	          <Button type="primary" htmlType="submit">
	          	Submit
	          </Button>
	          <div class="divider"/>
	        </Form.Item>
	      </Form>
	      <div className="center-items"> OR </div>
	      <div className="social-login-div center-items" >
		        <Button type="primary" htmlType="submit" id="test" onClick={this.facebookLogin}>
			      	ENTER WITH FACEBOOK!
			    </Button>
			    <span class="divider"/>
		        <Button type="primary" htmlType="submit" onClick={this.googleLogin}>
			      	ENTER WITH GOOGLE!
			    </Button>
		    </div>



		        </>
	    }
        
        </div>
        

    );
  }
}

const mapStateToProps = (state) => {
	return {
		loading: state.forumUserAuth.loading,
		error: state.forumUserAuth.error,
		token: state.forumUserAuth.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username,password))
	}
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
