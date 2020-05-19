// ensure we have the same strings for our cases below
import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../actions/threadPostActions';

// define defailt redux state variables
const initialState = {
  threadPosts: [],
  loading: false,
  error: null,
};

// define how state changes depending on the action keyword received
export default function threadPostReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_POSTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        threadPosts: action.threadPosts,
      };

    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        threadPosts: [],
      };

    default:
      return state;
  }
}
