import {combineReducers } from 'redux'
import colorReducer from './colorReducer'
import questionsReducer from './questionsReducer'
import threadTopicReducer from './threadTopicReducer.js'
import threadPostReducer from './threadPostReducer.js'

const rootReducer = combineReducers({
	color: colorReducer,
	questions: questionsReducer,
	threadTopics: threadTopicReducer,
	threadPosts: threadPostReducer,
})

export default rootReducer;