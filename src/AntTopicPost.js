import React from 'react';
import ReactDOM from 'react-dom';

import './AntForumPost.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import { Card, Avatar, Form, Icon, Input, Button, Spin } from 'antd';


// redux
import { connect } from 'react-redux';
import * as forumAuthActions from './redux/actions/forumUserAuthActions';
import * as forumUserActions from './redux/actions/forumUserActions.js'

const { Meta } = Card;

class AntForumPost extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {

    if (this.props.data["creator"]) {
      if (!(this.props.data["creator"] in this.props.userToProfilePic)){
        this.props.getUserProfilePic("http:localhost:8000/quizbank/getForumUserProfilePic/" + this.props.data["creator"] + "/", this.props.data["creator"], this.props.token)
      }
    }
    // instantiate variables used for the forum post
    let descriptionObject;
    let avatarSize;
    let postStylePadding;
    let title;

    postStylePadding = 0
    avatarSize = 50;
    descriptionObject = (
      <div>
        <span className="description-text">
        {this.props.data["post_text"]}
        </span>
        <br />
        <br />
      </div>
    );
    // title is the username when the card is for a comment
    // we link it to its threadID so react knows what to render    
    title = <Link to={"/forum/"+this.props.threadID} style={{ textDecoration: 'none' }}><span className="username-text">{this.props.data["post_title"]}</span> </Link>
    let postStyle = { 
            width: "100%",
            display:"inline-block",
            "border-left": 0,
            "border-right": 0,
            "border-bottom": 0,
            "float": "right",
          }
    
    
    return (
      <div className="post-container">
        <div className="card-holder" style={{"padding-left": postStylePadding}}>
          <Card style={postStyle}>
            <Meta
              avatar={<Avatar size={avatarSize} style={{"border": "4px solid lightblue", "border-radius": "50%"}} src={this.props.userToProfilePic[this.props.data["creator"]]} />}
              title={title}
              description={this.props.data["creator"]}
            />
          </Card>
        </div>
      </div>
    );
  }
}

// redux management below
const mapStateToProps = state => ({
  token: state.forumUserAuth.token,
  user: state.forumUserAuth.user,
  userToProfilePic: state.forumUserData.userNameToProfilePic,

});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(forumAuthActions.logout()),
    loginViaLocalStorage: (token) => dispatch(forumAuthActions.setUser(token)),
    getUserProfilePic: (api_endpoint, username, token) => dispatch(forumUserActions.fetchForumUserProfilePic(api_endpoint, username, token)),

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AntForumPost);