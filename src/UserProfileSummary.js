import React from "react";
import "./UserProfileSummary.css";
import avatarImage from './tempImages/tempAvatar.jpg'

import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  message,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
export class UserProfileSummary extends React.Component {

	constructor(props) {
    super(props);
  }

  componentDidMount(){
    if (window.localStorage["token"]) {
      //this.props.loginViaLocalStorage(this.props);
    }
  }
  render() {

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};




  	let myForm = ""

  	return (
  		<div className="profile-summary-container">
  		<Dragger {...props}>
	    <p className="ant-upload-drag-icon">
	      <InboxOutlined />
	    </p>
	    <p className="ant-upload-text">Click or drag file to upload a new profile picture here!</p>
	  </Dragger>
	  </div>
	);
  }
	
}

export default UserProfileSummary;
