import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../actions/threadPostActions';

const initialState = {
  threadPosts: [],
  loading: false,
  error: null
};

export default function threadPostReducer(state = initialState, action){
	switch(action.type) {
		case FETCH_POSTS_BEGIN:
            return {
            	...state,
            	loading: true,
            	error: null
            }

        case FETCH_POSTS_SUCCESS:
      		return {
      			...state,  
      			loading: false,
      			threadPosts: action.threadPosts
      		}

      	case FETCH_POSTS_FAILURE:
      		return {
      			...state,
      			loading: false,
      			error: action.payload.error,
      			threadPosts: []
      		}

      	default:
      	return state;
	}
}