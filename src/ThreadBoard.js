import React from "react";
import './ThreadBoard.css';
import ThreadSummary from "./ThreadSummary.js";

function ThreadBoard(props) {
	return (
		<>
			<div className="thread-board">
				<p className="thread-board-title">DISCUSSIONS (this should be a prop)</p>
				<ThreadSummary className="thread-board-child">topic1</ThreadSummary>
				<ThreadSummary className="thread-board-child">topic2</ThreadSummary>
				<ThreadSummary className="thread-board-child">topic3</ThreadSummary>
			</div>
		</>
	);

}

export default ThreadBoard;