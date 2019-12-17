import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer.js';
import thunk from 'redux-thunk';



export default createStore(
	rootReducer,
	applyMiddleware(thunk)
);