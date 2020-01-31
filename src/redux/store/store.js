import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer.js';
import thunk from 'redux-thunk';


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
	rootReducer,
	composeEnhances(
	applyMiddleware(thunk)
));