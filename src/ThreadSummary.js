import React from "react";
import "./ThreadSummary.css";

function ThreadSummary(props){
	return (
		<div className="thread-summary">
			<div className="thread-summary-child">My Thread Title 1</div>
			<div className="thread-summary-child">Thread Summary</div>
			<div className="thread-summary-child">My Thread Creator</div>
			<div className="thread-summary-child"> Meta data about the forum should go here</div>
		</div>
	);
}

export default ThreadSummary;