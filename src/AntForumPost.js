import React from 'react';
import ReactDOM from 'react-dom';

// styles
import './AntForumPost.css';
import { Card, Avatar } from 'antd';

// redux
import { connect } from 'react-redux';
import * as forumAuthActions from './redux/actions/forumUserAuthActions';
import * as forumUserActions from './redux/actions/forumUserActions';

// components for user input
import ThreadForm from './ThreadForm';

// variable needed for ant design library
const { Meta } = Card;

/*
This is the component for all of the forum posts.
It takes in a data object via props and curates the desired UI.
*/
class AntForumPost extends React.Component {
  constructor(props) {
    super(props);
    this.replyButtonClick = this.replyButtonClick.bind(this);

    // reply clicked keeps track of whether we show the comment form
    this.state = {
      replyClicked: false,
    };
  }

  componentDidMount() {
    // log the user in if local storage claims they're logged in
    if (window.localStorage["token"]) {
      this.props.loginViaLocalStorage(window.localStorage);
    }
    // check if this.props.user's profile pic is already found.
    // if not, query the db and add it to redux
    if (!(this.props.data['creator'] in this.props.userToProfilePic)) {
      this.props.getUserProfilePic('http:localhost:8000/quizbank/getForumUserProfilePic/' + this.props.data['creator'] + "/", this.props.data['creator']);
    }
  }

  /*
  changes the state of the forum post component to show the reply form
  */
  replyButtonClick() {
    this.setState({ replyClicked: !this.state.replyClicked});
  }


  render() {
    // instantiate variables used for the forum post
    let descriptionObject;
    let avatarSize;
    let postStylePadding;
    let title;
    let postStyle = {
      width: '100%',
      display: 'inline-block',
      'border-left': 0,
      'border-right': 0,
      'border-bottom': 0,
      float: 'right',
    };
    // the following variables only get filled if the user is logged in
    let antForumForm = '';
    let antForumButton = '';
    let formPropsData = '';

    // change visibility of comments and buttons if the user is logged in
    if (this.props.user) {
      formPropsData = {
        is_main_post: false,
        main_post_id: this.props.data['main_post_id'],
        parent_id: this.props.data['post_id'],
        creator: this.props.user,
        post_title: this.props.user,
        indentation_level: this.props.data['indentation_level'] + 1,
        token: this.props.token,
      };
      // make form and button for replying to posts visible
      antForumForm = <ThreadForm data={formPropsData} />;
      antForumButton = <div> <text className="button" onClick={this.replyButtonClick}>REPLY</text></div>;
    }

    // sets attributes for the post if the post is of type "main post"
    if (this.props.data['is_main_post']) {
      postStyle = {
        width: '100%',
        display: 'inline-block',
        'border-left': 0,
        'border-right': 0,
        'border-bottom': 0,
        'border-top': 0,
        float: 'right',
      };
      postStylePadding = 0; // the main post isn't indented
      avatarSize = 100; // profile pic size
      // the description object represents the "body" of the post
      descriptionObject = (
        <div>
          <span className="username-text">{this.props.data["creator"]}</span> 
          <br />
          <br />
          <span className="description-text title-text">
            {this.props.data['post_text']}
          </span>
        </div>
      );
      title = <span className="title">{this.props.data["post_title"]}</span>;
    } else {
      // sets attributes for the post if the post IS NOT the main post of the forum
      // (in other words is a comment post)
      if (this.props.data['indentation_level'] >= 3) {
        antForumButton = '';
      }
      postStylePadding = 50 * (this.props.data['indentation_level'] - 1);
      avatarSize = 50; // profile pic size
      // the description object represents the "body" of the post
      descriptionObject = (
        <div>
          <span className="description-text">
            {this.props.data['post_text']}
          </span>
          <br />
          <br />
          {antForumButton}
        </div>
      );
      // title is the username when the card is for a comment
      title = <span className="username-text">{this.props.data['creator']}</span>;
    }

    // we edit our description object to have the text form for users to type in
    if (this.state.replyClicked) {
      descriptionObject = (
        <div>
          <span className="description-text">
            {this.props.data["post_text"]}
          </span>
          <br /> 
          <br /> 
          <div> <text className="button" onClick={this.replyButtonClick}> CANCEL REPLY </text></div> 
          <ThreadForm data={formPropsData}/>
        </div>
      );
    }

    // returns our component depending on whether it is a 'main post' or a 'comment'
    if (this.props.data['is_main_post']) {
      return (
        <div className="post-container">
          <div className="card-holder" style={{ 'padding-left': postStylePadding }}>
            <Card style={postStyle}>
              <Meta
                avatar={<Avatar size={avatarSize} style={{ 'border': '4px solid lightblue', 'border-radius': '50%' }} src={this.props.userToProfilePic[this.props.data["creator"]]} />}
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
          <div className="card-holder" style={{ 'padding-left': postStylePadding }}>
            <Card style={postStyle}>
              <Meta
                avatar={<Avatar size={avatarSize} style={{ 'border': '4px solid lightblue', 'border-radius': '50%' }} src={this.props.userToProfilePic[this.props.data["creator"]]} />}
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
// take redux state and place its values into our props
const mapStateToProps = (state) => ({
  token: state.forumUserAuth.token,
  user: state.forumUserAuth.user,
  userToProfilePic: state.forumUserData.userNameToProfilePic,
});

// take redux actions and place it into our props
const mapDispatchToProps = (dispatch) => {
  return {
    loginViaLocalStorage: (token) => dispatch(forumAuthActions.setUser(token)),
    getUserProfilePic: (apiEndpoint, username) => dispatch(forumUserActions.fetchForumUserProfilePic(apiEndpoint, username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AntForumPost);
