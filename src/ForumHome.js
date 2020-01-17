import React from 'react';
import Thread from './Thread.js';
import ThreadBoard from './ThreadBoard.js';
import ForumNavBar from './ForumNavBar.js';
import { fetchThreadPosts } from "./redux/actions/threadPostActions.js";
import { connect } from "react-redux";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'


class ForumHome extends React.Component {
	componentDidMount(){
    	this.props.dispatch(fetchThreadPosts('http://localhost:8000/quizbank/api/v1/threadposts/?format=json'));
  	}
	render() {
		if(this.props.error){
  			return <div>Error! {this.props.error.message}</div>;
	  	}
	  	if(this.props.loading){
	  		return <div>Loading...</div>;
	  	}

	  	let allPosts = this.props.threadPosts;
	  	let topicToPosts = Object.create(null);
	  	if (allPosts.length > 0 ) {
	  		allPosts.forEach(function (post) {
	  			topicToPosts[post["thread_topic"]] = topicToPosts[post["thread_topic"]] || [];
	  			topicToPosts[post["thread_topic"]].push(post)
	  		});
	  		let i;
	  		// TODO change this later, i don't like it appended to the end of the array :(
	  		for (i=1;i<=Object.keys(topicToPosts).length;i++){
	  			console.log("do we do anything here?")
	  			topicToPosts[i].push(<Thread posts={topicToPosts[i]} title={"Temp Title"}/>);
	  		}
	  		console.log(topicToPosts)
	  		return (
	  			<>
			  	  <ForumNavBar />
			  	  <ThreadBoard title={"DISCUSSION TOPICS"} posts={topicToPosts[1]} />
			  	  <Switch>
        			<Route path="/forum/:threadName" render={() => topicToPosts[1][4]}/>
        		  </Switch>
			    </>
	  		);
	  	}
	  	else {
	  		return (
			  	<>
			  	  <h1> Data wasn't retreived properly</h1>
			    </>
	    	);
	  	}	
	  
	}
}

const mapStateToProps = state => ({
	threadPosts: state.threadPosts.threadPosts,
	loading: state.threadPosts.loading,
	error: state.threadPosts.error
})
export default connect(mapStateToProps)(ForumHome);
