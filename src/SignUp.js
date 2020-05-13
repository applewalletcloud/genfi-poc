import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from './redux/actions/forumUserAuthActions.js';
import "./SignUp.css"

// The two lines below aren't comments, but global variables for the use of social login
/* global FB */
/* global gapi */

import { loadAuth2 } from 'gapi-script'

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

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.state = {
      user: "not yet updated",
      confirmDirty: false,
      autoCompleteResult: [],
    }
  }

  componentDidMount(){
    this.fbLogout = this.fbLogout.bind(this);
    this.loadFbLoginApi();
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(this.props);
    }
  }

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

    /**
  Calls the FB api to create a window for social login
    **/
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

    /** 
  Callback function for when facebook login succeeds
    **/
    async responseFacebook(accessToken) {
      // now we want to see if we can check a django token from the backend
      await this.props.socialLogin("facebook", accessToken);
      //window.top.location.href="https://localhost:3000/forum";
    }

    /**
  Logs user out of fb
  **/
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

    // i believe the api handles the failure cases and we don't want to change webpages should the sign in fail
            
    }

    /** 
  Callback function for when google login succeeds
    **/
    async responseGoogle(accessToken) {
      console.log(accessToken)
      // now we want to see if we can check a django token from the backend
      await this.props.socialLogin("google", accessToken);
      //window.top.location.href="https://localhost:3000/forum";
    }

  // state = {
  //   confirmDirty: false,
  //   autoCompleteResult: [],
  // };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onAuth(
        	values.userName,
        	values.email,
        	values.password,
        	values.confirm
        )
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.props.token){
      console.log("we enter here and our token is: ");
      console.log(this.props.token);
      this.props.history.push('/forum');
    }

    return (
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
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
const mapStateToProps = (state) => {
	return {
		loading: state.forumUserAuth.loading,
		error: state.forumUserAuth.error,
    token: state.forumUserAuth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, email, password1, password2) => dispatch(actions.authSignUp(username,email,password1,password2)),
    socialLogin: (socialProvider, accessToken) => dispatch(actions.authSocialLogin(socialProvider, accessToken)),
    loginViaLocalStorage: (token) => dispatch(actions.setUser(token)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedRegistrationForm)
