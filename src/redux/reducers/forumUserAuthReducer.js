import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
} from '../actions/forumUserAuthActions.js';

const initialState = {
	token: null,
	error: null,
	loading: false,
	testState: "harro"
}


export default function forumUserAuthReducer(state = initialState, action){
	console.log("enter teh auth reducer");
	console.log(action)
	switch(action.type){

		case AUTH_START:
			return {
				...state,
				error: null,
				loading: true
			}
		case AUTH_SUCCESS:
			console.log("in the reducer")
			console.log(action)
			return {
				...state,
				token: action.token,
				error: null,
				loading: false
			}
		case AUTH_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			}
		case AUTH_LOGOUT:
			return {
				...state,
				token: null
			}
		default:
			return state
	}
}