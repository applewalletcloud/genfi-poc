import React from 'react';
import './Body.css';
import ColorfulSquare from './ColorfulSquare.js';

class Body extends React.Component {

  render() {
  	return (
      <div className="Body">
        <p> Below is a stateful square which changes as time passes! </p>
        <ColorfulSquare />
      </div>
    );
  }
}

export default Body;