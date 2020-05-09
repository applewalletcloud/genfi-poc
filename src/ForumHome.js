import React from 'react';

import "./ForumHome.css";


// Components for the Forum SPA
import AntThread from './AntThread.js';
import Thread from './Thread.js';
import ThreadBoard from './ThreadBoard.js';

// connect allows mapping between react props and redux
import { connect } from "react-redux";

// components for react routing
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

// import actions from redux states
import { fetchThreadPosts } from "./redux/actions/threadPostActions.js";
import * as forumUserAuthActions from './redux/actions//forumUserAuthActions.js'

import AntForumBoard from './AntForumBoard.js'

export class ForumHome extends React.Component {
  constructor(props) {
    super(props);
    this.getServerUser = this.getServerUser.bind(this); // PROBABLY NEED TO UNCOMMENT THIS LATER, TODO
  }

  componentDidMount() {
    if (this.props.dispatch) {
      this.props.dispatch(fetchThreadPosts('http://localhost:8000/quizbank/api/v1/threadposts/?format=json'));
    } else {
      console.log("props is undefined for dispatch in ForumHome");
    }
    if (this.props.onTryAutoSignUp) {
      this.props.onTryAutoSignUp();
    } else {
      console.log("props is undefined for tryautosignup in forumhome");
    }
    if (this.props.getSocialToken) {
      this.props.getSocialToken();
    } else {
      console.log("props is undefined for getsocialtoken");
    }
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(window.localStorage);
    }
  }

  // TODO: DELETE AFTER DONE TESTING
  getServerUser() {
    console.log("getserveruser button results below!!!!!");
    if (this.props.token !== undefined){
      console.log("we enter since forumtoken isn't undefined");
      console.log(this.props.token);
      console.log("the fb jwt is above");
      this.props.setServerUser(this.props.token);
    } else{
      console.log("looks like the token is undefined, so we aren't calling the action we need");
    }
  }
  // TODO: DELETE AFTER DONE TESTING
  //   testLogin() {
  //    console.log("WE HAVE ENTERED THE TEST LOGIN FUNCTION")
   //    FB.getLoginStatus(function(response) {
    //  if (response.status === 'connected') {
    //      var accessToken = response.authResponse.accessToken;
    //      console.log("THE ACCESS TOKEN IS HERE!!! HAVE WE FOUND IT ?!?!?! -------");
          

    //      console.log(accessToken);
         
    //  } else{
    //  console.log("looks like there's no connection")

    //  }

    // } );

  //   }
    // TODO: DELETE AFTER DONE TESTING
    // testGoogleLogin(googleUser) {
    //  this.setState({
     //    googleUser: googleUser
    //  })
    //  console.log("printing the google user!")
    //  console.log(this.state.googleUser);
    //  console.log("why is it empty?");
    //  console.log("printing gapi stuff right below");
    //  let instance = gapi.auth2.getAuthInstance();
    //  console.log(instance.isSignedIn.get());

    // }

    // testGoogleLogout(){
    //  let instance = gapi.auth2.getAuthInstance();
    //  instance.signOut();
    // }

    // testLogout() {
    //  FB.logout()
    // }
    // TODO: DELETE AFTER DONE TESTING
 //    responseFacebook = (response) => {
  //   console.log(response);
  // }
   
  createTopicToPostsObject(allPosts) {
    let topicToPosts = Object.create(null);
    allPosts.forEach(function (post) {
      topicToPosts[post["thread_topic"]] = topicToPosts[post["thread_topic"]] || [];
      topicToPosts[post["thread_topic"]].push(post)
    });
    return topicToPosts;
  }

  createTopicToThreadPosts(topicToPosts) {
    let i;
    let topicToThreadPosts = [];
      // TODO change this later, i don't like it appended to the end of the array :(
      for (i=1;i<=Object.keys(topicToPosts).length;i++){
        console.log("do we do anything here?")
        //topicToPosts[i].push(<Thread posts={topicToPosts[i]} title={"Temp Title"}/>);
        console.log(this.props.match.params.threadID)
        topicToThreadPosts.push(<Thread posts={topicToPosts[i]} title={"Temp Title"} threadID={i-1}/>);
      }
      return topicToThreadPosts;
  }

  render() {
    if(this.props.error) {
        return <div>Error! {this.props.error.message}</div>;
      }
    {/** TODO: replace with an image of some sort**/}
    if(this.props.loading) {
      return <div>Loading...</div>;
    }

      let allPosts = this.props.threadPosts;
      
      if (allPosts == undefined) {
        console.log("error, seems we're getting empty props for posts");
      }
      if (allPosts != undefined && allPosts.length > 0) {
        // CREATE TOPIC TO POSTS OBJECT FUNCTUON CALL SHOULD GO HERE
        let topicToPosts = this.createTopicToPostsObject(allPosts);
        let topicToThreadPosts = this.createTopicToThreadPosts(topicToPosts);
        return (
          <>
            <div class="horizontal-gap"></div>
            <Switch>
              <Route exact path="/forum" render={() => <AntForumBoard />} />
              <Route path="/forum/:threadID" render={(props) => <AntThread threadID={props.match.params.threadID} />} />
            </Switch>
          </>
        );
      }
      else {
        return (
          <>
            <h1>Data wasn't retreived properly</h1>
          </>
        );
      } 
    
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.forumUserAuth.token !== null,
  testState: state.forumUserAuth.testState,
  threadPosts: state.threadPosts.threadPosts,
  loading: state.threadPosts.loading,
  error: state.threadPosts.error,
  forumToken: state.forumUserAuth.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setServerUser: (myarg) => dispatch(forumUserAuthActions.setUser(myarg)),
    socialLogin: (socialProvider, accessToken) => dispatch(forumUserAuthActions.authSocialLogin(socialProvider, accessToken)),
    loginViaLocalStorage: (token) => dispatch(forumUserAuthActions.setUser(token)),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumHome);
