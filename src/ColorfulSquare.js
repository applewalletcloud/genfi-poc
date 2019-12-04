import React from 'react';
import './ColorfulSquare.css';
import { connect } from 'react-redux';
import { changeColor } from './redux/actions/changeColor.js';

class ColorfulSquare extends React.Component {
  constructor(props) {
  	super(props);
  	this.onClick = this.onClick.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick(){
    this.props.changeColor('rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')');
  }
  
  onClick(){
    this.props.changeColor('rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')');
  };
  
  render() {
  	return (
      <div className="Colorful-Square" style={{background: this.props.color}} onClick={this.onClick}>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {color: state.color};
}

const mapDispatchToProps = {
  changeColor: changeColor
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorfulSquare);

