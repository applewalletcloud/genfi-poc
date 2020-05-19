import React from 'react';

// router
import { connect } from "react-redux";

// redux
import * as forumUserAuth from './redux/actions/forumUserAuthActions'; 
import * as forumUserActions from './redux/actions/forumUserActions';

// component for navbar
import ForumNavBar from './ForumNavBar';


// styles
import './EditProfilePage.css'
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
    // logs the user in if details are in local storage
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(window.localStorage)
    } 
  }

  // takes the image that is uploaded into the dragger and pairs them on the backend
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.setUserProfilePic("http://localhost:8000/quizbank/postForumUserProfilePic/", values, this.props.user, this.props.token).then(() => {
          // we query it to change state so that the react page will rerender
          this.props.getUserProfilePic("http:localhost:8000/quizbank/getForumUserProfilePic/" + this.props.user + "/", this.props.user, this.props.token)
        })
      }
    });
  };

  // function that gets the value of the file that's uploaded 
  // provided by the ant design library
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList.slice(-1);
  };

  render() {
    // set variable needed for ant design library
    const { getFieldDecorator } = this.props.form;

    // if the user is logged in, then get their profile picture to display
    if (this.props.user) {
      if (!(this.props.user in this.props.userToProfilePic)){
        this.props.getUserProfilePic("http:localhost:8000/quizbank/getForumUserProfilePic/" + this.props.user + "/", this.props.user, this.props.token)
      }
    } 
    /*
    returns a simple navbar + form to submit images
    */
    return (
      <>
        <ForumNavBar />
        <div className="edit-profile-page-container">
          <div className="center">
            <h1>Welcome, {this.props.user}!</h1>
            <Avatar size={100} style={{"border": "4px solid lightblue", "border-radius": "50%"}} src={this.props.userToProfilePic[this.props.user]} />
          </div>

          {/* Should visit the ant design website to learn more if you want to tweak the form further*/}
          <Form onSubmit={this.handleSubmit} className="left">
            {/*Text that appears above the dragger to upload your profile picture*/}
            <Form.Item label="Edit Your Profile Picture Below"> 
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [],
              })(
                <Upload.Dragger name="files" action="/upload.do" accept="image/png, image/jpeg" multiple={false}>
                  {/* Specify the UI and text of the dragger */}
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

// wrapper required for Ant Design modules
const WrappedEditProfileForm = Form.create({ name: 'validate_other' })(EditProfileForm);

// redux management below
// take redux state and place its values into our props
const mapStateToProps = (state) => {
  return {
    user: state.forumUserAuth.user,
    token: state.forumUserAuth.token,
    userToProfilePic: state.forumUserData.userNameToProfilePic,
  }
}

// take redux actions and place it into our props
const mapDispatchToProps = dispatch => {
  return {
    setUserProfilePic: (url, data, username, token) => dispatch(forumUserActions.setForumUserProfilePic(url, data, username, token)),
    getUserProfilePic: (api_endpoint, username, token) => dispatch(forumUserActions.fetchForumUserProfilePic(api_endpoint, username, token)),
    loginViaLocalStorage: (token) => dispatch(forumUserAuth.setUser(token)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedEditProfileForm);
