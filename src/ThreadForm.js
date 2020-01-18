import React from "react";
import "./ThreadForm.css";
import { Form } from 'react-bootstrap';

function test(){
	console.log("is historia dumb?")
}

function test2(e){
	e.preventDefault();
	console.log("success?")
}

function ThreadForm(props){
	return (
		<>
			<div className="text-area-border">
			<Form onSubmit={test2}>
			  <Form.Control as="textarea" className="text-form" placeholder="Input your thoughts here!" rows="6" />
			  
			  <input className="text-area-button"type="submit" value="Submit" onSubmit={test2} />
			  
			</Form>
			</div>
		</>
	);
}

export default ThreadForm;
