// ensure we have the same strings for our cases below
import {
  FETCH_FORUM_USER_DATA_BEGIN,
  FETCH_FORUM_USER_DATA_SUCCESS,
  FETCH_FORUM_USER_DATA_FAILURE,
} from '../actions/forumUserActions.js';

// define defailt redux state variables
const initialState = {
  error: null,
  loading: false,
  user: null,
  userNameToProfilePic: {},
};

// define how state changes depending on the action keyword received
export default function forumUserAuthReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FORUM_USER_DATA_BEGIN:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case FETCH_FORUM_USER_DATA_SUCCESS:
      const temp = {...state.userNameToProfilePic, [action.forumUserData.username]: action.forumUserData.url}
      return {
        ...state,
        userNameToProfilePic: {...state.userNameToProfilePic, [action.forumUserData.username]: action.forumUserData.url},
        error: null,
        loading: false,
      };

    case FETCH_FORUM_USER_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}
