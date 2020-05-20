import React from 'react';

// styles
import './ForumNavBar.css';
import Button from 'react-bootstrap/Button';

// react router
import { Route, Link, BrowserRouter } from 'react-router-dom';

// social login
// The two lines below aren't comments, but global variables for the use of social login
/* global FB */
import { loadAuth2 } from 'gapi-script';

// redux
import { connect } from 'react-redux';
import * as forumAuthActions from './redux/actions/forumUserAuthActions';

// needed for jest tests
require("regenerator-runtime/runtime"); 

/*
Navigation bar for the top of the website.
Buttons in navbar allow user to login/signup, logout, and change their profile pic.
*/
export class ForumNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
    this.logoutCallback = this.logoutCallback.bind(this);
  }

  componentDidMount() {
    this.loadFbLoginApi();
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(window.localStorage);
    }
  }


  // loads the fb API for the navbar
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
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      if (fjs != undefined){
         fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'facebook-jssdk'));
  }


  // callback function to log the user out.
  // it will log the user out of google/fb login if needed as well.
  async logoutCallback() {
    // resets local storage and redux state
    this.props.logout();

    // log out of google if the user logged in with google
    const instance = await loadAuth2('243107404278-152ffjsf5nh5niktchl60vol4i2rg7k6.apps.googleusercontent.com', 'profile email');
    instance.signOut();

    // logout of fb if the user logged in with facebook
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        FB.logout();
      }
    });

    // redirect to home page
    window.location.href = 'https://localhost:3000/forum';
  }

  render() {
    let myProfileLink = '';
    // if the user is logged in, display a button that allows them to change their profile picture
    if (this.props.user) {
      myProfileLink = <Link to="/myProfile"><div className="nav-child">My Profile</div></Link>
    }

    return (
      <div className="nav-bar">
        {/* navigation buttons that are displayed independent of login status */}
        <Link to="/forum"><div className="nav-child">Main</div></Link>
        {myProfileLink}
        {
          window.localStorage['token']
            ?
          /* render logout when we have a user logged in */
            (
              <>
                <span className="push-right">
                  <Button className="LoginButton" variant="outline-primary" onClick={() => this.logoutCallback()}>Logout</Button>
                </span>
              </>
            )
            :
            /* render login and signup buttons when we DO NOT have a user logged in */
            (
              <>
                <span className="push-right">
                  <Link to="/login"><Button className="LoginButton" variant="outline-primary">Login</Button></Link>
                  <Link to="/signup"><Button className="LoginButton" variant="outline-primary">Sign Up</Button></Link>
                </span>
              </>
            )
        }
      </div>
    );
  }
}

// redux management below
const mapStateToProps = (state) => ({
  user: state.forumUserAuth.user,
});

// take redux actions and place it into our props
const mapDispatchToProps = (dispatch) => {
  return {
    loginViaLocalStorage: (token) => dispatch(forumAuthActions.setUser(token)),
    logout: () => dispatch(forumAuthActions.logout()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ForumNavBar);
