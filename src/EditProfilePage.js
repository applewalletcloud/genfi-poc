import React from 'react';

import * as forumUserAuth from './redux/actions/forumUserAuthActions.js'; 
import * as forumUserData from './redux/actions/forumUserActions.js'

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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log("we hit submit?");
        console.log(values);
        this.props.setUserProfilePic("http://localhost:8000/quizbank/postForumUserProfilePic/", values, this.props.user, this.props.token)
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

    return (
      <div className="edit-profile-page-container">
      <div className="center">
      <h1>Welcome, {this.props.user}!</h1>
      <Avatar size={100} style={{"border": "4px solid lightblue", "border-radius": "50%"}} src={"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d7c99ebb-62eb-45ff-8ecf-da92d86c6d59/ddp780g-10c2a033-2863-467e-b9e8-16d0fd22c790.png/v1/fill/w_1024,h_1450,q_80,strp/hxh___hisoka_morrow_by_khalilxpirates_ddp780g-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xNDUwIiwicGF0aCI6IlwvZlwvZDdjOTllYmItNjJlYi00NWZmLThlY2YtZGE5MmQ4NmM2ZDU5XC9kZHA3ODBnLTEwYzJhMDMzLTI4NjMtNDY3ZS1iOWU4LTE2ZDBmZDIyYzc5MC5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19._qDuMYQrCxygXSCjKXML2mY2f6u-9Ubq0foxa0Xs1bI"} />
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
    );
  }
}

const WrappedEditProfileForm = Form.create({ name: 'validate_other' })(EditProfileForm);

const mapStateToProps = (state) => {
  return {
    user: state.forumUserAuth.user,
    token: state.forumUserAuth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserProfilePic: (url, data, username, token) => dispatch(forumUserData.setForumUserProfilePic(url, data, username, token)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedEditProfileForm);
