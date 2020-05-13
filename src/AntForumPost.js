import React from 'react';
import ReactDOM from 'react-dom';

import './AntForumPost.css';
import { Card, Avatar, Form, Icon, Input, Button, Spin } from 'antd';
import ThreadForm from "./ThreadForm.js"


// redux
import { connect } from 'react-redux';
import * as forumAuthActions from './redux/actions/forumUserAuthActions';


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

    // change visibility of comments and buttons if the user is logged in
    if (this.props.user) {
      antForumForm = <ThreadForm />
      antForumButton = <div className="button" onClick={this.replyButtonClick}>REPLY</div>
    }

    // sets attributes for the post if the post is of type "main post"
    if (this.props.data["isMainPost"]) {
      postStylePadding = 0// the main post isn't indented
      avatarSize = 100;
      descriptionObject = (
        <div>
          <span className="username-text">{this.props.data["username"]}</span> 
          <br />
          <br />
          <span className="description-text title-text">
          {this.props.data["comment"]}
          </span>
        </div>
      );
      title = <span className="title">{this.props.data["title"]}</span>
    } else {
      // sets attributes for the post if the post is of type "comment"
      if (this.props.data["indentationLevel"] >= 3) {
        antForumButton = ""
      }
      postStylePadding = 50*(this.props.data["indentationLevel"]-1)
      avatarSize = 50;
      descriptionObject = (
        <div>
          <span className="description-text">
          {this.props.data["comment"]}
          </span>
          <br />
          <br />
          {antForumButton}
        </div>
      );
      // title is the username when the card is for a comment
      title = <span className="username-text">{this.props.data["username"]}</span> 
    }
    
    let postStyle = { 
            width: "100%",
            display:"inline-block",
            "border-left": 0,
            "border-right": 0,
            "border-bottom": 0,
            "float": "right",
          }
    if (this.state.replyClicked) {
      descriptionObject = (
        <div>
        <span className="description-text">
        {this.props.data["comment"]}
        </span>
        <br /> 
        <br /> 
        <div className="button" onClick={this.replyButtonClick}> CANCEL REPLY</div> 
        <ThreadForm />
        </div>
      );
    }
    if (this.props.data["isMainPost"]) {
      return (
        <div className="post-container">
          <div className="card-holder" style={{"padding-left": postStylePadding}}>
            <Card style={postStyle}>
              <Meta
                avatar={<Avatar size={avatarSize} style={{"border": "4px solid lightblue", "border-radius": "50%"}} src={this.props.data["profilePic"]} />}
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
              avatar={<Avatar size={avatarSize} style={{"border": "4px solid lightblue", "border-radius": "50%"}} src={this.props.data["profilePic"]} />}
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
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(forumAuthActions.logout()),
    loginViaLocalStorage: (token) => dispatch(forumAuthActions.setUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AntForumPost);