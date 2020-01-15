import {combineReducers } from 'redux'
import colorReducer from './colorReducer';
import questionsReducer from './questionsReducer';
import threadTopicReducer from './threadTopicReducer.js'

const rootReducer = combineReducers({
	color: colorReducer,
	questions: questionsReducer,
	threadTopics: threadTopicReducer,
})

export default rootReducer;