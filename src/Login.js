import React from 'react';

// react router
import { NavLink } from 'react-router-dom';

// The two lines below aren't comments, but global variables for the use of social login
/* global FB */
/* global gapi */

// social login imports
import { loadAuth2 } from 'gapi-script'
import { GoogleLogin } from 'react-google-login';
import { GoogleAuthorize } from 'react-google-authorize';
import FacebookLogin from 'react-facebook-login';

// redux imports
import { connect } from 'react-redux';
import * as actions from './redux//actions/forumUserAuthActions.js';

// nav bar import for top of page
import ForumNavBar from './ForumNavBar';

// styles
import "./Login.css";
import { Form, Icon, Input, Button, Spin } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

/*
Login page for users. 
Possible via google and fb social login as well.
*/
export class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.fbLogout = this.fbLogout.bind(this);
    this.googleLogout = this.googleLogout.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.state = {
      user: "not yet updated",
    }
  }

  componentDidMount(){
    // load fb api and login via local storage if already logged in
    this.loadFbLoginApi();
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(this.props);
    }
  }

  // callback function for when the user tries to log in
  // simple verification is available for the field
  // they cannot be empty, email must contain an @ symbol
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.username, values.password);
      } 
    });
   
  };

  // loads the fb api asynchronously 
  // provided by the fb sdk
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

    /* 
    Callback function for when facebook login succeeds
    We get the django token for backend authorization
    */
    async responseFacebook(accessToken) {
      // login with facebook via access token
      await this.props.socialLogin("facebook", accessToken);
    }

    /*
    Callback function for when google login succeeds
    We get the django token for backend authorization
    */
    async responseGoogle(accessToken) {
      // Log in with google via access token 
      await this.props.socialLogin("google", accessToken);
    }

    /*
    Logs user out of fb
    */
    fbLogout() {
      FB.logout()
    }

    /*
    Calls the FB api to create a window for social login
    */
    facebookLogin(successCallback){
      // call the fb login function
      // if the user is already logged in, they will log in with the current account
      FB.login(function(response) {
        // if the user logs in via fb
        if (response.authResponse) {
          // sign in with social action
          successCallback(response.authResponse["accessToken"])
        } else {
          // I believe the else case is covered gracefully by the api
          console.log('User cancelled login or did not fully authorize.');
        }
    })
    }

    /*
    Loads the google api and logs the user out
    */
    async googleLogout(){
      let instance = await loadAuth2("243107404278-152ffjsf5nh5niktchl60vol4i2rg7k6.apps.googleusercontent.com", 'profile email');
      instance.signOut()
    }

    /*
    Loads the google api then prompts the user to log in
    */
    async googleLogin(successCallback) {
      // load the google api to call sign in
      // we use the await approach to avoid getting a null object for gapi 
      let instance = await loadAuth2("243107404278-152ffjsf5nh5niktchl60vol4i2rg7k6.apps.googleusercontent.com", 'profile email');
      // opens the sign in options for the client
      instance.signIn()
      .then((res) => {
        // in this case we've logged in, we want to redirect to the main forum page
        successCallback(res["uc"]["access_token"])
      })
      // the api handles the failure cases and we don't want to change webpages should the sign in fail    
    }



  render() {
    // required variable for ant design
    const { getFieldDecorator } = this.props.form;

    // if the user is logged in already, redirect to the main page
    if (this.props.token){
      this.props.history.push('/forum');
    }

    let userLoginMessage = "Please enter your login info below:"
    if (this.props.error) {
      userLoginMessage = this.props.error
    }

    // returns a form for user login followed by social login buttons
    return (
      <>
        <ForumNavBar />
        <div class="login-page-container">
          {userLoginMessage}
          {this.props.loading
            ?
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
                <Button type="primary" htmlType="submit" id="facebook-login-button" onClick={() => this.facebookLogin(this.responseFacebook)}>
                  ENTER WITH FACEBOOK!
                </Button>
                <span class="divider"/>
                <Button type="primary" htmlType="submit" id="google-login-button" onClick={() => this.googleLogin(this.responseGoogle)}>
                  ENTER WITH GOOGLE!
                </Button>
              </div>
            </>
          }  
        </div>
      </>
    );
  }
}

// move redux state into props for this component
const mapStateToProps = (state) => {
  return {
    loading: state.forumUserAuth.loading,
    error: state.forumUserAuth.error,
    token: state.forumUserAuth.token,
  }
}

// move redux actions into props for this component
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username,password)),
    socialLogin: (socialProvider, accessToken) => dispatch(actions.authSocialLogin(socialProvider, accessToken)),
    loginViaLocalStorage: (token) => dispatch(actions.setUser(token)),
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
