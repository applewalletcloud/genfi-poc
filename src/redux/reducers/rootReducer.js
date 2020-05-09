import { combineReducers } from 'redux'
import threadTopicReducer from './threadTopicReducer.js'
import threadPostReducer from './threadPostReducer.js'
import forumUserAuthReducer from './forumUserAuthReducer.js'

const rootReducer = combineReducers({
	threadTopics: threadTopicReducer,
	threadPosts: threadPostReducer,
	forumUserAuth: forumUserAuthReducer,
})

export default rootReducer;