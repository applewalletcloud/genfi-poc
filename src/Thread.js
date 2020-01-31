import React from "react";
import "./Thread.css";
import ThreadPost from './ThreadPost.js';
import ThreadForm from './ThreadForm.js';

function Thread(props){

	let i;
	let threadPosts = [];
	for (i = 0; i < props.posts.length; i++){
		threadPosts.push(<ThreadPost data={props.posts[i]} />)
	}
	return (
		<>
			<h1 className="header"> {props.title} </h1>
			{threadPosts}
			<ThreadForm threadID={props.threadID} />
		</>
	);
}

export default Thread;