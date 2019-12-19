import React from "react";
import "./Thread.css";
import ThreadPost from './ThreadPost.js';
import ThreadForm from './ThreadForm.js';
import ForumNavBar from './ForumNavBar.js';

function Thread(props){
	return (
		<>
			<ForumNavBar />
			<h1 className="header"> This is my static thread! </h1>
			<ThreadPost />
			<ThreadPost />
			<ThreadPost />
			<ThreadForm />
		</>
	);
}

export default Thread;