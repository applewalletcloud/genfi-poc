// ensure we have the same strings for our cases below
import {
  FETCH_TOPICS_BEGIN,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE,
} from '../actions/threadTopicActions';

// define defailt redux state variables
const initialState = {
  threadTopics: [],
  loading: false,
  error: null,
};

// define how state changes depending on the action keyword received
export default function threadTopicReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_TOPICS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        threadTopics: action.threadTopics,
      };

    case FETCH_TOPICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        threadTopics: [],
      };

    default:
      return state;
  }
}
