import { CHANGE_COLOR } from '../actions/changeColor.js';

function colorReducer(state = {color: 'rgb(255,255,255)'}, action) {
	switch(action.type) {
		case CHANGE_COLOR:
		  return {
		  	...state,
		  	color: action.color
		  };

		default:
		  return state; 
	}; 
}

export default colorReducer;