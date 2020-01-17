import React from "react";
import "./ThreadPost.css";
import UserProfileSummary from './UserProfileSummary.js'

function ThreadPost(props){
	return (
		<div className="thread-post"><div className="left-child"> <UserProfileSummary /></div><div className="right-child"> {props.data["thread_text"]} </div></div>
	);
}

ThreadPost.propTypes = {
	
}

export default ThreadPost;