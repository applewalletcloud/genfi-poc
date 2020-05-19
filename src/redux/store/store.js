import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/*
The store is the state container of redux.
Here we are stating that the root reducer is the source of state,
and that we are allowing async actions through thunk middleware
*/
export default createStore(
  rootReducer,
  composeEnhances(
    applyMiddleware(thunk),
  ),
);
