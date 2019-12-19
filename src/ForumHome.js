import React from 'react';
import Thread from './Thread.js';
import ThreadBoard from './ThreadBoard.js'

function ForumHome(props) {
  return (
  	<>
  	  <ThreadBoard />
      <Thread />
    </>
  );
}

export default ForumHome;