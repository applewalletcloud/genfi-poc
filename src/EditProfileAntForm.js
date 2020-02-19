import React from 'react';

import { setForumUserProfilePic } from './redux/actions/forumUserActions.js'; 

import { connect } from "react-redux";

import {
  Form,
  Select,
  Button,
  Upload,
  Icon,
  Input,
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
        console.log(values.username);
        this.props.setUserData("http://localhost:8000/quizbank/postForumUserProfileData/", values)
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
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };


    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>

        <Form.Item label="Username" {...formItemLayout}>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
        </Form.Item>

        <Form.Item label="Dragger">
          {getFieldDecorator('dragger', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [{ required: true, message: 'Please upload your desired profile picture!' }],
          })(
            <Upload.Dragger name="files" action="/upload.do" accept="image/png, image/jpeg" multiple={false}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Upload your desired profile picture here!</p>
            </Upload.Dragger>,
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEditProfileForm = Form.create({ name: 'validate_other' })(EditProfileForm);

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
  return {
    setUserData: (url, data) => dispatch(setForumUserProfilePic(url, data)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedEditProfileForm);

