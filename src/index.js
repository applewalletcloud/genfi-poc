import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ForumHome from './ForumHome';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store/store.js'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Route path="/home" component={App} />
      <Route path="/forum" component={ForumHome} />
    </div>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/forum" component={ForumHome} />
      </div>
    </Router>
  </Provider>, 
  document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
