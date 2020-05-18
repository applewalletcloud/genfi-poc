import React from 'react';

// redux: connect allows mapping between react props and redux
import { connect } from 'react-redux';

// SPA routing
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// styles
import './ForumHome.css';
// Ant Design Loading animation
import { Spin } from 'antd';

// Components for the Forum SPA
import ForumNavBar from './ForumNavBar';
import ForumBoard from './ForumBoard';
import AntTopicPost from './AntTopicPost';

// import actions from redux states
import * as threadTopicActions from './redux/actions/threadTopicActions';
import * as forumUserAuthActions from './redux/actions/forumUserAuthActions';

/*
This is the forum home page. It houses the list of forum topics that users can
use to direct themselves to forums and the navbar. The forum topics are represented
as AntTopicPosts
*/
export class ForumHome extends React.Component {
  async componentDidMount() {
    // refresh redux state if the user is already logged in
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(window.localStorage);
    }
    // query the database to get all of the forum topics to display
    this.props.fetchThreadTopics('http://localhost:8000/quizbank/getForumMainPosts/');
  }

  render() {
    if (this.props.error) {
      // we have an error with querying our threadpost data
      return <div>"We apologize for the technical difficulties. Please try again later."</div>;
    }
    if (this.props.loading) {
      // show loading spinner if we're still grabbing data
      return (
        <div className="center">
          <Spin size="large" />
        </div>
      );
    }

    // generate an array holding all of the thread topic components
    // the thread topic components are the summaries for each forum on the home page 
    const forumTopics = [];
    for (const topicData of this.props.threadTopics) {
      forumTopics.push(<AntTopicPost data={ topicData } threadID={ topicData.post_id } />);
    }
    const forumHomePage = (
      <>
        <ForumNavBar />
        <p className="forum-home-title">Discussion Topics</p>
        {forumTopics}
      </>
    );
    // we keep track of and route forums by their thread id, which is dictated in the url
    return (
      <>
        <Switch>
          <Route exact path="/forum/:threadID" render={(props) => <ForumBoard threadID={props.match.params.threadID} />} />
          <Route exact path="/forum" render={() => forumHomePage} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.forumUserAuth.token !== null,
  testState: state.forumUserAuth.testState,
  threadPosts: state.threadPosts.threadPosts,
  loading: state.threadPosts.loading,
  error: state.threadPosts.error,
  token: state.forumUserAuth.token,
  threadTopics: state.threadTopics.threadTopics,
});

const mapDispatchToProps = (dispatch) => {
  return ({
    setServerUser: (myarg) => dispatch(forumUserAuthActions.setUser(myarg)),
    socialLogin: (socialProvider, accessToken) => dispatch(forumUserAuthActions.authSocialLogin(socialProvider, accessToken)),
    loginViaLocalStorage: (token) => dispatch(forumUserAuthActions.setUser(token)),
    fetchThreadTopics: (apiEndpoint) => dispatch(threadTopicActions.fetchThreadTopics(apiEndpoint)),
    dispatch,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumHome);
