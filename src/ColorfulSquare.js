import React from 'react';
import './ColorfulSquare.css';
import { connect } from 'react-redux';
import { changeColor } from './redux/actions/changeColor.js';
import store from './redux/store/store.js'

class ColorfulSquare extends React.Component {
  constructor(props) {
  	super(props);
  	
  	/*this.state = {
  	  color: this.color
  	};*/
  	this.onClick = this.onClick.bind(this);
  }
  
  onClick(){
    this.props.changeColor('rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')');
    //this.setState({ color: 'rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')' });
  };
  
  render() {
  	return (
      <div className="Colorful-Square" style={{background: this.props.color}} onClick={this.onClick}>
      {/*{this.state.color}*/}
      {"my color is " + this.props.color}
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

