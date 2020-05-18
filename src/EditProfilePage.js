import React from 'react';

import ForumNavBar from './ForumNavBar';

import * as forumUserAuth from './redux/actions/forumUserAuthActions.js'; 
import * as forumUserActions from './redux/actions/forumUserActions.js'

import './EditProfilePage.css'

import { connect } from "react-redux";

import {
  Form,
  Select,
  Button,
  Upload,
  Icon,
  Input,
  Avatar,
} from 'antd';

const { Option } = Select;

/** 
the params in the form get passed through the values variable
the object's keys are the field decorators (e.g. "username" and "dragger")
**/
class EditProfileForm extends React.Component {
  componentDidMount(){
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(window.localStorage)
    }
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log("we hit submit?");
        console.log(values);
        this.props.setUserProfilePic("http://localhost:8000/quizbank/postForumUserProfilePic/", values, this.props.user, this.props.token).then(() => {
          this.props.getUserProfilePic("http:localhost:8000/quizbank/getForumUserProfilePic/" + this.props.user + "/", this.props.user, this.props.token)
        })
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList.slice(-1);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.props.user) {
      if (!(this.props.user in this.props.userToProfilePic)){
        this.props.getUserProfilePic("http:localhost:8000/quizbank/getForumUserProfilePic/" + this.props.user + "/", this.props.user, this.props.token)
      }
    }

    return (
      <>
      <ForumNavBar />
      <div className="edit-profile-page-container">
      <div className="center">
      <h1>Welcome, {this.props.user}!</h1>
      <Avatar size={100} style={{"border": "4px solid lightblue", "border-radius": "50%"}} src={this.props.userToProfilePic[this.props.user]} />
      </div>
      <Form onSubmit={this.handleSubmit} className="left">

        <Form.Item label="Edit Your Profile Picture Below"> {/** "Profile Picture" used to be "Dragger" **/}
          {getFieldDecorator('dragger', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [],
          })(
            <Upload.Dragger name="files" action="/upload.do" accept="image/png, image/jpeg" multiple={false}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload!</p>
              <p className="ant-upload-hint">Upload your desired profile picture here!</p>
            </Upload.Dragger>,
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
      </>
    );
  }
}

const WrappedEditProfileForm = Form.create({ name: 'validate_other' })(EditProfileForm);

const mapStateToProps = (state) => {
  return {
    user: state.forumUserAuth.user,
    token: state.forumUserAuth.token,
    userToProfilePic: state.forumUserData.userNameToProfilePic,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserProfilePic: (url, data, username, token) => dispatch(forumUserActions.setForumUserProfilePic(url, data, username, token)),
    getUserProfilePic: (api_endpoint, username, token) => dispatch(forumUserActions.fetchForumUserProfilePic(api_endpoint, username, token)),
    loginViaLocalStorage: (token) => dispatch(forumUserAuth.setUser(token)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedEditProfileForm);
