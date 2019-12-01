import React from 'react';
import './ColorfulSquare.css';
import { connect } from 'react-redux';
import { changeColor } from './redux/actions/changeColor.js';

class ColorfulSquare extends React.Component {
  constructor(props) {
  	super(props);
  	
  	this.state = {
  	  color: 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')'
  	};
  	
  	this.onClick = this.onClick.bind(this);
  }
  
  onClick(){
    this.setState({ color: 'rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')' });
  };
  
  render() {
  	return (
      <div className="Colorful-Square" style={{background: this.state.color}} onClick={this.onClick}>
      {this.state.color}
      </div>
    );
  }
}

export { ColorfulSquare };

export default connect(
  null,
  {
    changeColor: changeColor
  }
  )(ColorfulSquare);