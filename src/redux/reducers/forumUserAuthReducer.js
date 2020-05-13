import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_USER
} from '../actions/forumUserAuthActions.js';

const initialState = {
	token: null,
	error: null,
	loading: false,
	testState: "harro",
	user: null,
}


export default function forumUserAuthReducer(state = initialState, action){
	switch(action.type){

		case AUTH_START:
			return {
				...state,
				error: null,
				loading: true
			}
		case AUTH_SUCCESS:
			return {
				...state,
				token: action.token,
				error: null,
				loading: false
			}
		case AUTH_FAIL:
			console.log(action);
			console.log("enter auth fail reducer");
			return {
				...state,
				error: action.error,
				loading: false
			}
		case AUTH_LOGOUT:
			return {
				...state,
				token: null,
				user: null
			}
		case SET_USER:
			return {
				...state,
				user: action.user,
				token: action.token
			}
		default:
			return state
	}
}