import {combineReducers } from 'redux'
import colorReducer from './colorReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
	color: colorReducer,
	questions: questionsReducer
})

export default rootReducer;