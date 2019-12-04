import React from 'react';
import './Body.css';
import MyColorfulSquare from './ColorfulSquare.js';

class Body extends React.Component {

  render() {
  	return (
      <div className="Body">
        <p> Below is a stateful square which will eventually change as time passes! Currently if you click on it, there's a callback to change the internal color. This is done through redux.</p>
        <MyColorfulSquare />
      </div>
    );
  }
}

export default Body;