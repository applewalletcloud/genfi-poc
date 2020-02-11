import React from 'react';
import Thread from './Thread.js';
import ThreadBoard from './ThreadBoard.js';
import ForumNavBar from './ForumNavBar.js';
import { fetchThreadPosts } from "./redux/actions/threadPostActions.js";
import { connect } from "react-redux";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as actions from './redux/actions/facebookUserAuthActions.js';
import * as forumUserAuthActions from './redux/actions//forumUserAuthActions.js'
import FacebookLogin from 'react-facebook-login';
/*global FB*/
/* global gapi */
import { GoogleLogin } from 'react-google-login';
import { GoogleAuthorize } from 'react-google-authorize';




//import AntTable from './AntTable.js'

class ForumHome extends React.Component {
	constructor(props) {
	    super(props);
	    this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
	    this.testLogin = this.testLogin.bind(this);
	    this.testLogout = this.testLogout.bind(this);
	    this.responseFacebook = this.responseFacebook.bind(this);
	    this.testGoogleLogin = this.testGoogleLogin.bind(this);
	    this.loadGoogleApi = this.loadGoogleApi.bind(this);
	    this.state = {
	    	googleUser: undefined
	    };
	    this.getServerUser = this.getServerUser.bind(this);
	}

	



    loadGoogleApi() {
        const script = document.createElement("script");
	    script.src = "https://apis.google.com/js/platform.js";
	    script.async = true;
	    document.body.appendChild(script);
    }


	componentDidMount() {
    	console.log("about to try loading the facebook api")
    	console.log("ARE WE GETTING HERE?!?!?")
        this.loadFbLoginApi();
        this.props.dispatch(fetchThreadPosts('http://localhost:8000/quizbank/api/v1/threadposts/?format=json'));
    	this.props.onTryAutoSignUp();
    	this.props.getSocialToken();
    	this.loadGoogleApi();
    }

	loadFbLoginApi() {

		window.fbAsyncInit = function() {
		  FB.init({
		    appId      : '186492402430643',
		    cookie     : true,
		    xfbml      : true,
		    version    : 'v6.0'
		  });
		    
		  FB.AppEvents.logPageView();   
		    
		};

		(function(d, s, id){
		   var js, fjs = d.getElementsByTagName(s)[0];
		   if (d.getElementById(id)) {return;}
		   js = d.createElement(s); js.id = id;
		   js.src = "https://connect.facebook.net/en_US/sdk.js";
		   fjs.parentNode.insertBefore(js, fjs);
		 }(document, 'script', 'facebook-jssdk'));
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

    testGoogleLogout(){
    	let instance = gapi.auth2.getAuthInstance();
    	instance.signOut();
    }

    testLogout() {
    	FB.logout()
    }

    responseFacebook = (response) => {
	  console.log(response);
	}
	 
	getServerUser() {
		console.log("getserveruser button results below!!!!!")
		if (this.props.forumToken !== undefined){
			console.log("we enter since forumtoken isn't undefined")
			console.log(this.props.forumToken)
			console.log("the jwt is above")
			this.props.setServerUser(this.props.forumToken);
		} else{
			console.log("looks like the token is undefined, so we aren't calling the action we need")
		}
		

	}

	render() {
		if(this.props.error){
  			return <div>Error! {this.props.error.message}</div>;
	  	}
	  	if(this.props.loading){
	  		return <div>Loading...</div>;
	  	}

	  	let allPosts = this.props.threadPosts;
	  	let topicToPosts = Object.create(null);
	  	let topicToThreadPosts = [];
	  	if (allPosts.length > 0 ) {
	  		allPosts.forEach(function (post) {
	  			topicToPosts[post["thread_topic"]] = topicToPosts[post["thread_topic"]] || [];
	  			topicToPosts[post["thread_topic"]].push(post)
	  		});
	  		let i;
	  		// TODO change this later, i don't like it appended to the end of the array :(
	  		for (i=1;i<=Object.keys(topicToPosts).length;i++){
	  			console.log("do we do anything here?")
	  			//topicToPosts[i].push(<Thread posts={topicToPosts[i]} title={"Temp Title"}/>);
	  			console.log(this.props.match.params.threadID)
	  			topicToThreadPosts.push(<Thread posts={topicToPosts[i]} title={"Temp Title"} threadID={i-1}/>);
	  		}
	  		return (
	  			<>
	  			  <p>{"HELLO! forum token:" + this.props.forumToken}</p>
	  			  <FacebookLogin
	    appId="186492402430643"
	    autoLoad={true}
	    fields="name,email,picture"
	    onClick={this.componentClicked}
	    callback={this.responseFacebook} />
	  			  <button onClick={this.testLogin}> THIS IS THE BUTTON TO PRINT THE TOKEN </button>
	  			  <button onClick={this.testLogout}> THIS IS THE BUTTON TO LOGOUT </button>
			  	  <GoogleLogin
		          clientId="243107404278-152ffjsf5nh5niktchl60vol4i2rg7k6.apps.googleusercontent.com"
		          buttonText="LOGIN WITH GOOGLE"
		          onSuccess={(response) => {
		              console.log(response)
		              this.testGoogleLogin(response)
		              console.log("response for google login above")

		  		}}// need to store this login data somewhere
		          onFailure={(response) => {
		      console.log(response);}}
		        />
		        <button onClick={this.testGoogleLogin}> PRINT GOOGLE TOKEN </button>
		        <button onClick={this.testGoogleLogout}> Test Google Signout </button>
		        <button onClick={this.getServerUser}> Get SErver User </button>
			  	  <ForumNavBar isAuthenticated={this.props.isAuthenticated} />
			  	  {/**<AntTable />**/}
			  	  <Switch>
			  	    <Route exact path="/forum" render={() => <ThreadBoard title={"DYNAMIC DISCUSSION TOPICS"} posts={topicToPosts[1]} />}/>
        		  	<Route path="/forum/:threadID" render={(props) => topicToThreadPosts[props.match.params.threadID]} />
        		  </Switch>
			    </>
	  		);
	  	}
	  	else {
	  		return (
			  	<>
			  	  <h1> Data wasn't retreived properly</h1>
			    </>
	    	);
	  	}	
	  
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.forumUserAuth.token !== null,
	testState: state.forumUserAuth.testState,
	threadPosts: state.threadPosts.threadPosts,
	loading: state.threadPosts.loading,
	error: state.threadPosts.error,
	token: state.facebookUserAuth.token,
	forumToken: state.forumUserAuth.token
})

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheckState()),
		getSocialToken: () => dispatch(actions.getSessionToken()),
		setServerUser: (myarg) => dispatch(forumUserAuthActions.setUser(myarg)),
		dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumHome);
