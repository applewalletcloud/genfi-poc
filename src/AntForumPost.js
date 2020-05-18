import React from 'react';
import ReactDOM from 'react-dom';

import './AntForumPost.css';
import { Card, Avatar, Form, Icon, Input, Button, Spin } from 'antd';
import ThreadForm from './ThreadForm.js';

// redux
import { connect } from 'react-redux';
import * as forumAuthActions from './redux/actions/forumUserAuthActions';
import * as forumUserActions from './redux/actions/forumUserActions.js'

const { Meta } = Card;

class AntForumPost extends React.Component {
  constructor(props) {
    super(props);
    this.replyButtonClick = this.replyButtonClick.bind(this);
    this.state = {
      replyClicked: false,
    };
  }


  componentDidMount(){
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(window.localStorage);
    }
    // check if this.props.user's profile pic is already found. if not, add it to redux
    console.log("inside component did mount of ant forum post")
    if (!(this.props.data["creator"] in this.props.userToProfilePic)){
      this.props.getUserProfilePic("http:localhost:8000/quizbank/getForumUserProfilePic/" + this.props.data["creator"] + "/", this.props.data["creator"], this.props.token)
    }
  }

  /**
  changes the state of the comment to show the reply form
  **/
  replyButtonClick() {
    this.setState({ replyClicked: !this.state.replyClicked});
  }
  render() {
    // instantiate variables used for the forum post
    let descriptionObject;
    let avatarSize;
    let postStylePadding;
    let title;
    let antForumForm = ""
    let antForumButton = ""

    console.log("CAN I SEE THIS PRINT STATEMENT INSIDE MY ANT FORUM POST?!")

    let postStyle = { 
            width: "100%",
            display:"inline-block",
            "border-left": 0,
            "border-right": 0,
            "border-bottom": 0,
            "float": "right",
          }

    let formPropsData = ""
    // change visibility of comments and buttons if the user is logged in
    if (this.props.user) {
      formPropsData = {
        "is_main_post": false,
        "main_post_id": this.props.data["main_post_id"],
        "parent_id": this.props.data["post_id"],
        "creator": this.props.user,
        "post_title": this.props.user,
        "indentation_level": this.props.data["indentation_level"] + 1,
        "token": this.props.token
      }

      antForumForm = <ThreadForm data={formPropsData}/>
      antForumButton = <div className="button" onClick={this.replyButtonClick}>REPLY</div>
    }

    // sets attributes for the post if the post is of type "main post"
    if (this.props.data["is_main_post"]) {
      postStyle = { 
            width: "100%",
            display:"inline-block",
            "border-left": 0,
            "border-right": 0,
            "border-bottom": 0,
            "border-top": 0,
            "float": "right",
          }

      postStylePadding = 0// the main post isn't indented
      avatarSize = 100;
      descriptionObject = (
        <div>
          <span className="username-text">{this.props.data["creator"]}</span> 
          <br />
          <br />
          <span className="description-text title-text">
          {this.props.data["post_text"]}
          </span>
        </div>
      );
      title = <span className="title">{this.props.data["post_title"]}</span>
    } else {
      // sets attributes for the post if the post is of type "comment"
      if (this.props.data["indentation_level"] >= 3) {
        antForumButton = ""
      }
      postStylePadding = 50*(this.props.data["indentation_level"]-1)
      avatarSize = 50;
      descriptionObject = (
        <div>
          <span className="description-text">
          {this.props.data["post_text"]}
          </span>
          <br />
          <br />
          {antForumButton}
        </div>
      );
      // title is the username when the card is for a comment
      title = <span className="username-text">{this.props.data["creator"]}</span> 
    }
    
    
    if (this.state.replyClicked) {
      descriptionObject = (
        <div>
        <span className="description-text">
        {this.props.data["post_text"]}
        </span>
        <br /> 
        <br /> 
        <div className="button" onClick={this.replyButtonClick}> CANCEL REPLY</div> 
        <ThreadForm data={formPropsData}/>
        </div>
      );
    }
    if (this.props.data["is_main_post"]) {
      return (
        <div className="post-container">
          <div className="card-holder" style={{"padding-left": postStylePadding}}>
            <Card style={postStyle}>
              <Meta
                avatar={<Avatar size={avatarSize} style={{"border": "4px solid lightblue", "border-radius": "50%"}} src={this.props.userToProfilePic[this.props.data["creator"]]} />}
                title={title}
                description={descriptionObject}
              />
            </Card>
          </div>
          {antForumForm}
        </div>
      );
    } else {
    return (
      <div className="post-container">
        <div className="card-holder" style={{"padding-left": postStylePadding}}>
          <Card style={postStyle}>
            <Meta
              avatar={<Avatar size={avatarSize} style={{"border": "4px solid lightblue", "border-radius": "50%"}} src={this.props.userToProfilePic[this.props.data["creator"]]} />}
              title={title}
              description={descriptionObject}
            />
          </Card>
        </div>
      </div>
    );
  }
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