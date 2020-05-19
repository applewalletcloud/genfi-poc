import React from 'react';

// router
import { NavLink } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import * as actions from './redux/actions/forumUserAuthActions.js';

// component for navigation bar
import ForumNavBar from './ForumNavBar';

// social login
import { loadAuth2 } from 'gapi-script'
// The two lines below aren't comments, but global variables for the use of social login
/* global FB */
/* global gapi */

// styles
import "./SignUp.css"
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

// variables required for ant design form
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

/*
Signup page for users. 
Possible via google and fb social login as well.
A django account will be should the user choose to sign up via social login.
*/
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.fbLogout = this.fbLogout.bind(this);
    this.state = {
      user: "not yet updated",
      confirmDirty: false,
      autoCompleteResult: [],
    }
  }

  // loads fb api and logs teh user in if they're already logged in
  componentDidMount(){
    this.loadFbLoginApi();
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(this.props);
    }
  }

  // async loads teh facebook api
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
  Callback function for when facebook login succeeds
  we also get the jwt token for future backend queries to django
  */
  async responseFacebook(accessToken) {
    // now we want to see if we can check a django token from the backend
    await this.props.socialLogin("facebook", accessToken);
  }

  /*
  Logs user out of fb
  */
  fbLogout() {
    FB.logout()
  }

  /**
  Loads the google api then prompts the user to log in
  **/
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

  /*
  Callback function for when google login succeeds.
  we also get the jwt token for the django backend for authentication
  */
  async responseGoogle(accessToken) {
    await this.props.socialLogin("google", accessToken);
  }

  // form validation provided by ant design
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
        	values.userName,
        	values.email,
        	values.password,
        	values.confirm
        )
      }
    });
  };

  // helper function for form validation provided by ant design
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  // helper function provided by ant design for form validation
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  // helper function provided by ant design for form validation
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    // required variable for ant design form
    const { getFieldDecorator } = this.props.form;

    // if user is already logged in, then go to the home page
    if (this.props.token){
      this.props.history.push('/forum');
    }

    // renders a sign up form with validation 
    // checks if the fields are empty
    // ensures email has an @ symbol
    // double checks that both passwords are the same
    return (
      <>
        <ForumNavBar />
        <div class="signup-page-container">
          {this.props.error}
          <Form onSubmit={this.handleSubmit}>
          	<Form.Item>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </Form.Item>
            <Form.Item >
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
      		  <Form.Item className="center-items">
              <Button type="primary" htmlType="submit">
              	Submit
              </Button> 
            </Form.Item>
          </Form>
          <div className="center-items"> OR </div>
            <div className="social-login-div center-items" >
              <Button type="primary" htmlType="submit" id="facebook-login-button" onClick={() => this.facebookLogin(this.responseFacebook)}>
                SIGN UP WITH FACEBOOK!
              </Button>
              <span class="divider"/>
              <Button type="primary" htmlType="submit" id="google-login-button" onClick={() => this.googleLogin(this.responseGoogle)}>
                SIGN UP WITH GOOGLE!
              </Button>
            </div>
          </div>
        </>
      );
    }
  }

// wrapper required for ant design
const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

// redux state mangement
// convert state from redux to props for this component
const mapStateToProps = (state) => {
	return {
		loading: state.forumUserAuth.loading,
		error: state.forumUserAuth.error,
    token: state.forumUserAuth.token
	}
}

// convert actions from redux to props for this component
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, email, password1, password2) => dispatch(actions.authSignUp(username,email,password1,password2)),
    socialLogin: (socialProvider, accessToken) => dispatch(actions.authSocialLogin(socialProvider, accessToken)),
    loginViaLocalStorage: (token) => dispatch(actions.setUser(token)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedRegistrationForm)
