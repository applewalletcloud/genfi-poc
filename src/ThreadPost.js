import React from "react";
import "./ThreadPost.css";
import UserProfileSummary from './UserProfileSummary.js'

function ThreadPost(props){
	return (
		<div className="thread-post"><div className="left-child"> <UserProfileSummary /></div><div className="right-child"> temp user info post blah blah blah</div></div>
	);
}

export default ThreadPost;