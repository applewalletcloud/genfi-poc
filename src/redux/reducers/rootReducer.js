import {combineReducers } from 'redux'
import threadTopicReducer from './threadTopicReducer.js'
import threadPostReducer from './threadPostReducer.js'
import forumUserAuthReducer from './forumUserAuthReducer.js'
import facebookUserAuthReducer from './facebookUserAuthReducer.js'

const rootReducer = combineReducers({
	threadTopics: threadTopicReducer,
	threadPosts: threadPostReducer,
	forumUserAuth: forumUserAuthReducer,
	facebookUserAuth: facebookUserAuthReducer,
})

export default rootReducer;