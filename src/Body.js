import React from 'react';
import './Body.css';
import ColorfulSquare from './ColorfulSquare.js';

class Body extends React.Component {

  render() {
  	return (
      <div className="Body">
        <p> Below is a stateful square which will eventuall change as time passes! Currently if you click on it, there's a callback to change the internal color. </p>
        <ColorfulSquare />
      </div>
    );
  }
}

export default Body;