import { combineReducers } from 'redux'
import threadTopicReducer from './threadTopicReducer.js'
import threadPostReducer from './threadPostReducer.js'
import forumUserAuthReducer from './forumUserAuthReducer.js'
import forumUserReducer from './ForumUserReducer.js'

const rootReducer = combineReducers({
	threadTopics: threadTopicReducer,
	threadPosts: threadPostReducer,
	forumUserAuth: forumUserAuthReducer,
	forumUserData: forumUserReducer,
})

export default rootReducer;