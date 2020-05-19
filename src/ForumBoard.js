import React from 'react';

// styles
import './ForumBoard.css';
import { Spin } from 'antd';

// router
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import * as forumUserAuthActions from './redux/actions/forumUserAuthActions';
import * as threadPostActions from './redux/actions/threadPostActions';

// components to compose the forum page
import AntForumPost from './AntForumPost';
import ForumComments from './ForumComments';
import ForumNavBar from './ForumNavBar';

/*
This is the main forum page. It contains everything that pertains to a forum:
the main post and the comments, where logged in users can comment.

We fetch all the data we need here for each forum and pass it down as props to
the lower level components.
*/
export default class ForumBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPostData: null,
      commentsData: null,
    };
  }

  async componentDidMount() {
    // get the forum's main post data
    let res = await fetch("http:localhost:8000/quizbank/getForumPostByID/"+this.props.threadID+"/");
    res.json().then(json => this.setState({ mainPostData: json }));
    // get the forum's comments data
    res = await fetch("http:localhost:8000/quizbank/getForumComments/"+this.props.threadID+"/");
    res.json().then(json => this.setState({ commentsData: json }));
  }
  render() {
    // if we've finished retreiving our data
    if (this.state.mainPostData && this.state.commentsData) {
      let myMainPostTitle = this.state.mainPostData["post_title"];
      return (
        <>
          <ForumNavBar />
          <div className="main-post-container">
            <AntForumPost data={this.state.mainPostData} />
          </div>
          <ForumComments data={this.state.commentsData} />
        </>
      );
    } else {
      // show a spinner if our data is not fully retreived
      return (
        <>
          <ForumNavBar />
          <div className="center">
            <Spin size="large" />)
          </div>
        </>
      );
    }
  }
}