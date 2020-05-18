import React from "react";
import "./ThreadForm.css";
import { Form } from 'react-bootstrap';
import { Button } from 'antd';


class ThreadForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {textValue: '', id: props.threadID}; 
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
  	}
	
	handleChange(e) {
		this.setState({textValue: e.target.value})
	}

	handleSubmit(e) {
		e.preventDefault();
		fetch("http://localhost:8000/quizbank/forumUserPost/",{
			method: 'POST',
			headers: new Headers({
				'Authorization': 'JWT ' + this.props.data["token"],
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({
				"is_main_post": this.props.data["is_main_post"], 
				"main_post_id": this.props.data["main_post_id"],
				"parent_id": this.props.data["parent_id"],
				"creator": this.props.data["creator"],
				"post_title": this.props.data["post_title"],
				"post_text": this.state.textValue,
				"indentation_level": this.props.data["indentation_level"]
			})
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		    console.error(error);
		});


		window.location.reload()
	}


	
	render() {
		return (
			<>
				<div className="text-area-border">
				<Form  onSubmit={this.handleSubmit} >
				  <Form.Control as="textarea" className="text-form" placeholder="Input your thoughts here!" rows="3" onChange={this.handleChange}/>
				  <Button className="text-area-button" onClick={this.handleSubmit}>Submit</Button>
				  
				</Form>
				</div>
			</>
		);
	}
	
}

export default ThreadForm;
