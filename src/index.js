import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ForumHome from './ForumHome';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Thread from './Thread.js';
import * as serviceWorker from './serviceWorker';
import { compose } from 'redux'
import { Provider } from 'react-redux';
import store from './redux/store/store.js'
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
//import '~antd/dist/antd.css';

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
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />

    <Router>
      <Switch>
        <Route exact path="/old" component={App} />
        <Route path="/forum" component={ForumHome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />

      </Switch>
    </Router>
  </Provider>, 
  document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
