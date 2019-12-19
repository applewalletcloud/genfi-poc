import React from "react";
import "./ThreadForm.css";
import { Form } from 'react-bootstrap';

function ThreadForm(props){
	return (
		<>
			<div className="text-area-border">
			  <Form.Control as="textarea" className="text-form" placeholder="Input your thoughts here!" rows="6" />
			</div>
			<input className="text-area-button"type="submit" value="Submit" />
		</>
	);
}

export default ThreadForm;
