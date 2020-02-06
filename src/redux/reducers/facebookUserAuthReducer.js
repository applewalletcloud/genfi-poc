import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  GET_TOKEN,
} from '../actions/facebookUserAuthActions.js';

const initialState = {
	token: null,
	error: null,
	loading: false,
	testState: "harro"
}


export default function forumUserAuthReducer(state = initialState, action){
	console.log(action)
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
		case GET_TOKEN:
			return {
				...state,
				token: action.token
			}
		default:
			return state
	}
}