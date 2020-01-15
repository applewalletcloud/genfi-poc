import {
  FETCH_TOPICS_BEGIN,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE
} from '../actions/threadTopicActions';

const initialState = {
  threadTopics: [],
  loading: false,
  error: null
};

export default function threadTopicReducer(state = initialState, action){
	switch(action.type) {
		case FETCH_TOPICS_BEGIN:
            return {
            	...state,
            	loading: true,
            	error: null
            }

        case FETCH_TOPICS_SUCCESS:
      		return {
      			...state,
      			loading: false,
      			threadTopics: action.threadTopics
      		}

      	case FETCH_TOPICS_FAILURE:
      		return {
      			...state,
      			loading: false,
      			error: action.payload.error,
      			threadTopics: []
      		}

      	default:
      	return state;
	}
}