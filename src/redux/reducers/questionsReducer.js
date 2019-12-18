import {
  FETCH_QUESTIONS_BEGIN,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE
} from '../actions/questionsActions';

const initialState = {
  questions: [],
  loading: false,
  error: null
};

export default function questionReducer(state = initialState, action){
	switch(action.type) {
		case FETCH_QUESTIONS_BEGIN:
            return {
            	...state,
            	loading: true,
            	error: null
            }

        case FETCH_QUESTIONS_SUCCESS:
      		return {
      			...state,
      			loading: false,
      			questions: action.questions
      		}

      	case FETCH_QUESTIONS_FAILURE:
      		return {
      			...state,
      			loading: false,
      			error: action.payload.error,
      			questions: []
      		}

      	default:
      	return state;
	}
}