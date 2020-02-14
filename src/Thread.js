import React from "react";
import "./Thread.css";
import ThreadPost from './ThreadPost.js';
import ThreadForm from './ThreadForm.js';


/**
Currently the Thread class just makes a  list of threadposts with a form underneath it. 

Joey wants the thread object to do the following:
given some identifier, pull in data from the db
if the data isn't available, create a table in the database
the database probably need a default entry placed into it


issue:
thread summary data also needs to be updated as thread posts are created and deleted
currently we have it s.t. thread summary data is tied to their id, maybe we should id them by a name
current proposal: can identify post data by id or name (1 to 1 mapping). if name or id doesn't exist, make a name and id for the new forum.
then have the thread pull in the data itself and have the name or id passed to it instead of the data
the name should take priority over the id
**/
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