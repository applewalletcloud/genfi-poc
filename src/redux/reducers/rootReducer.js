import {combineReducers } from 'redux'
import colorReducer from './colorReducer'
import questionsReducer from './questionsReducer'
import threadTopicReducer from './threadTopicReducer.js'
import threadPostReducer from './threadPostReducer.js'
import forumUserAuthReducer from './forumUserAuthReducer.js'
import facebookUserAuthReducer from './facebookUserAuthReducer.js'

const rootReducer = combineReducers({
	color: colorReducer,
	questions: questionsReducer,
	threadTopics: threadTopicReducer,
	threadPosts: threadPostReducer,
	forumUserAuth: forumUserAuthReducer,
	facebookUserAuth: facebookUserAuthReducer,
})

export default rootReducer;