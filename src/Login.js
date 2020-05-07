import React from 'react';
import { NavLink } from 'react-router-dom';

// redux imports
import { connect } from 'react-redux';
import * as actions from './redux//actions/forumUserAuthActions.js';

// UI imports
import { Form, Icon, Input, Button, Spin } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;



class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Need to delete: Received values of form: ', values);
      	const result = this.props.onAuth(values.username, values.password);
      	// TODO: can try a try-catch block to see if a promise is being rejected
      	// ^ note that there's a workaround for this that's currently implemented
      } 
    });
   
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log("we re-render the login component");
    console.log(this.props.token);
    if (this.props.token){
    	console.log("we enter here and our token is: ");
    	console.log(this.props.token);
    	this.props.history.push('/forum');
    }
    return (
    	<div>
    	{this.props.error}
    	{

    		this.props.loading ?

			<Spin indicator={antIcon} />

    		:

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
	        <Form.Item>
	          <Button type="primary" htmlType="submit">
	          	Login
	          </Button> 
	          Or
	          <NavLink to="/signup/"> signup </NavLink>
	        </Form.Item>
	      </Form>
	    }
        </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		loading: state.forumUserAuth.loading,
		error: state.forumUserAuth.error,
		token: state.forumUserAuth.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username,password))
	}
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
