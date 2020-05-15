import {
  FETCH_FORUM_USER_DATA_BEGIN,
  FETCH_FORUM_USER_DATA_SUCCESS,
  FETCH_FORUM_USER_DATA_FAILURE,
} from '../actions/forumUserActions.js';

const initialState = {
	error: null,
	loading: false,
	user: null,
	userNameToProfilePic: {},
}

export default function forumUserAuthReducer(state = initialState, action){
	switch(action.type){

		case FETCH_FORUM_USER_DATA_BEGIN:
			return {
				...state,
				error: null,
				loading: true
			}
		case FETCH_FORUM_USER_DATA_SUCCESS:
		console.log("the success action gets called properly")
		console.log("#######################################")
		console.log(action)
		console.log(action.forumUserData)
		let temp = {...state.userNameToProfilePic, [action.forumUserData.username]: action.forumUserData.url}
		console.log(temp)
			return {
				...state,
				userNameToProfilePic: {...state.userNameToProfilePic, [action.forumUserData.username]: action.forumUserData.url},
				error: null,
				loading: false
			}
		case FETCH_FORUM_USER_DATA_FAILURE:
			return {
				...state,
				error: action.error,
				loading: false
			}
		default:
			return state
	}
}