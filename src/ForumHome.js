import React from 'react';
import Thread from './Thread.js';
import ThreadBoard from './ThreadBoard.js'
import ForumNavBar from './ForumNavBar.js'

function ForumHome(props) {
  return (
  	<>
  	  <ForumNavBar />
  	  <ThreadBoard title={"DISCUSSION TOPICS"} />
    </>
  );
}

export default ForumHome;