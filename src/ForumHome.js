import React from 'react';
import Thread from './Thread.js';
import ThreadBoard from './ThreadBoard.js';
import ForumNavBar from './ForumNavBar.js';
import { fetchThreadPosts } from "./redux/actions/threadPostActions.js";
import { connect } from "react-redux";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as actions from './redux/actions/forumUserAuthActions.js'

class ForumHome extends React.Component {
	componentDidMount(){
    	this.props.dispatch(fetchThreadPosts('http://localhost:8000/quizbank/api/v1/threadposts/?format=json'));
    	this.props.onTryAutoSignUp();
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
	  	let topicToThreadPosts = [];
	  	if (allPosts.length > 0 ) {
	  		allPosts.forEach(function (post) {
	  			topicToPosts[post["thread_topic"]] = topicToPosts[post["thread_topic"]] || [];
	  			topicToPosts[post["thread_topic"]].push(post)
	  		});
	  		let i;
	  		// TODO change this later, i don't like it appended to the end of the array :(
	  		for (i=1;i<=Object.keys(topicToPosts).length;i++){
	  			console.log("do we do anything here?")
	  			//topicToPosts[i].push(<Thread posts={topicToPosts[i]} title={"Temp Title"}/>);
	  			console.log(this.props.match.params.threadID)
	  			topicToThreadPosts.push(<Thread posts={topicToPosts[i]} title={"Temp Title"} threadID={i-1}/>);
	  		}
	  		return (
	  			<>
			  	  <ForumNavBar isAuthenticated={this.props.isAuthenticated} test2={this.props.testState}/>
			  	  <Switch>
			  	    <Route exact path="/forum" render={() => <ThreadBoard title={"DYNAMIC DISCUSSION TOPICS"} posts={topicToPosts[1]} />}/>
        		  	<Route path="/forum/:threadID" render={(props) => topicToThreadPosts[props.match.params.threadID]} />
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
	isAuthenticated: state.forumUserAuth.token !== null,
	testState: state.forumUserAuth.testState,
	threadPosts: state.threadPosts.threadPosts,
	loading: state.threadPosts.loading,
	error: state.threadPosts.error
})

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheckState()),
		dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumHome);
