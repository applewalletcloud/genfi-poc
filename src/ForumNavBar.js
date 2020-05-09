import React from 'react';
import './ForumNavBar.css';
import Button from 'react-bootstrap/Button';
import * as forumAuthActions from './redux/actions/forumUserAuthActions.js';
import { connect } from 'react-redux';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

// The two lines below aren't comments, but global variables for the use of social login
/* global FB */
/* global gapi */

// needed for jest tests
require("regenerator-runtime/runtime"); 

export class ForumNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
  }

  componentDidMount() {
    this.loadFbLoginApi();
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


  render() {
    console.log(this.props.user)
    console.log("user props inside forum nav bar is above!")
    return (
      <div className="nav-bar">
          {/** navigation buttons **/}
          <Link to="/forum"><div className="nav-child">Main</div></Link>
          <Link to="/myProfile"><div className="nav-child">My Profile</div></Link>
        {
          window.localStorage["token"]
          ?
          /** render when we have a user logged in**/
          <>
            <span className="push-right">
              <Button className="LoginButton" variant="outline-primary">{"Logout"}</Button>
            </span>
          </>
          :
          /** render when we DO NOT have a user logged in **/
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

// redux management below
const mapStateToProps = state => ({
  token: state.forumUserAuth.token,
  user: state.forumUserAuth.user,
});

export default connect(mapStateToProps)(ForumNavBar);
