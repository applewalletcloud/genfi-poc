import {combineReducers } from 'redux';
import threadTopicReducer from './threadTopicReducer.js';
import threadPostReducer from './threadPostReducer.js';
import forumUserAuthReducer from './forumUserAuthReducer.js';
import facebookUserAuthReducer from './facebookUserAuthReducer.js';
import forumUserDataReducer from './forumUserReducer.js';

const rootReducer = combineReducers({
	threadTopics: threadTopicReducer,
	threadPosts: threadPostReducer,
	forumUserAuth: forumUserAuthReducer,
	facebookUserAuth: facebookUserAuthReducer,
	forumUserData: forumUserDataReducer,
})

export default rootReducer;