import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ForumHome from './ForumHome';
import Login from './Login.js';
import SignUp from './SignUp.js';
import ForumNavBar from './ForumNavBar.js';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store/store.js'
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import ForumBoard from './ForumBoard.js'

import ForumComments from './ForumComments.js'
import UserProfileSummary from './UserProfileSummary.js'

import AntForumPost from './AntForumPost.js';
import EditProfilePage from './EditProfilePage.js'
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
        <Route path="/" component={ForumNavBar} />
        <Route path="/forum" component={ForumHome} />
        <Route path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forumcomments" component={ForumComments} />
        <Route exact path="/forumpage" component={ForumBoard} />
        <Route exact path="/myProfile" component={EditProfilePage} />
        <Route exact path="/editMyProfile" component={EditProfilePage} />
      </div>
    </Router>
  </Provider>, 
  document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
