import React from "react";
import './ThreadBoard.css';
import ThreadSummary from "./ThreadSummary.js";
import PropTypes from 'prop-types';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Thread from './Thread.js'
import { fetchThreadTopics } from "./redux/actions/threadTopicActions.js";
import { connect } from "react-redux";

class ThreadBoard extends React.Component {
	componentDidMount(){
    	this.props.dispatch(fetchThreadTopics('http://localhost:8000/quizbank/api/v1/threadtopics/?format=json'));
  	}
	render() {
		if(this.props.error){
  			return <div>Error! {this.props.error.message}</div>;
	  	}
	  	if(this.props.loading){
	  		return <div>Loading...</div>;
	  	}
	  	let topics = this.props.threadTopics
	  	if (topics.length > 0 ){
	  		let threadArray = []
	  		let threadSummary
	  		for (let i = 0; i < topics.length; i++) {
	  			threadSummary = <ThreadSummary className="thread-board-child" title={topics[i]["topic_text"]} summary={topics[i]["summary_text"]} creator={topics[i]["creator"]} numComments={topics[i]["num_comments"]} lastUpdated={topics[i]["last_update"]} url={i}></ThreadSummary>
	  			threadArray.push(threadSummary)
	  		}
		
			return (
				<>
					<div className="thread-board">
						<p className="thread-board-title">{this.props.title}</p>
						{threadArray}	
					</div>
					
				</>
			);
		}
		else{
			return (
				<>
					<div className="thread-board">
						<p className="thread-board-title">{this.props.title}</p>
						<ThreadSummary className="thread-board-child" title={"Why Naruto is Amazing"} summary={"blah blah blah blah blah blah blah blah"} creator={"Senior Genfi"} numComments={455} lastUpdated={"2019-12-16"}></ThreadSummary>
						<ThreadSummary className="thread-board-child" title={"Static Thread"} summary={"summary 2"} creator={"mr2"} numComments={77} lastUpdated={"2019-12-16"}></ThreadSummary>
						<ThreadSummary className="thread-board-child" title={"title3"} summary={"summary 3"} creator={"mr3"} numComments={66} lastUpdated={"2019-12-16"}></ThreadSummary>
					</div>
					
				</>
			);
		}
	}

}

const mapStateToProps = state => ({
	threadTopics: state.threadTopics.threadTopics,
	loading: state.threadTopics.loading,
	error: state.threadTopics.error
})

export default connect(mapStateToProps)(ThreadBoard);


ThreadSummary.propTypes = {
	title: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired,
	creator: PropTypes.string.isRequired,
	numComments: PropTypes.number.isRequired,
	lastUpdated: PropTypes.instanceOf(Date).isRequired
};

