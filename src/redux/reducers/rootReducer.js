import { combineReducers } from 'redux';
import threadTopicReducer from './threadTopicReducer';
import threadPostReducer from './threadPostReducer';
import forumUserAuthReducer from './forumUserAuthReducer';
import forumUserReducer from './ForumUserReducer';

// we create a single source of truth reducer by
// combining all of our separate reducers!
const rootReducer = combineReducers({
  threadTopics: threadTopicReducer,
  threadPosts: threadPostReducer,
  forumUserAuth: forumUserAuthReducer,
  forumUserData: forumUserReducer,
});

export default rootReducer;