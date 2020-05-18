import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import store from './redux/store/store.js'

// router
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';

// styles
import './index.css';

// components to render
import ForumHome from './ForumHome';
import Login from './Login';
import SignUp from './SignUp';
import EditProfilePage from './EditProfilePage';

// required precaching react stuff
import * as serviceWorker from './serviceWorker';

// the link is to pull in bootstrap into the webpage
ReactDOM.render(
  <Provider store={store}>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
    <Router>
      <div>
        <Route path="/forum" component={ForumHome} />
        <Route path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/myProfile" component={EditProfilePage} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
