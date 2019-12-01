import React from 'react';
import './ColorfulSquare.css';
import { createStore } from 'redux';

class ColorfulSquare extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {red: 0, green: 0, blue: 0, color: "#ffffff"}
  }
  render() {
  	return (
      <div className="Colorful-Square" style={{background: this.state.color}} onClick={() => {this.setState({color: "#B93D23"});}}>
      {this.state.green}
      </div>
    );
  }
}

export default ColorfulSquare;