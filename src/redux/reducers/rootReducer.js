import { CHANGE_COLOR } from '../actions/changeColor.js';

function rootReducer(state = {r: 0, g: 0, b: 0}, action) {
	switch(action.type) {
		case CHANGE_COLOR:
		  return {
		  	r: action.r,
		  	g: action.g,
		  	b: action.b
		  };

		default:
		  return state;  
	}; 
}

export default rootReducer;