import React from "react";
import "./ThreadSummary.css";
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import Thread from './Thread.js';


function ThreadSummary(props){
	return (
		<>
        
		<div className="thread-summary">
			<div className="thread-summary-child title"><Link to={"/forum/" + props.url} style={{ textDecoration: 'none' }}><span className="hover">{props.title}</span>  </Link></div>
			<div className="thread-summary-child summary">{props.summary}</div>
			<div className="thread-summary-child creator"><Link to={""} style={{ textDecoration: 'none' }}><span className="hover">{props.creator}</span></Link></div>
			<div className="thread-summary-child meta-data">{props.numComments} comments, last updated: {props.lastUpdated}</div>
		</div>
		</>
	);
}

ThreadSummary.propTypes = {
	title: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired,
	creator: PropTypes.string.isRequired,
	numComments: PropTypes.number.isRequired,
	lastUpdated: PropTypes.instanceOf(Date).isRequired
};

export default ThreadSummary;