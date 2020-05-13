import React from 'react';
import ReactDOM from 'react-dom';

import './AntForumPost.css';
import { Card, Avatar, Form, Icon, Input, Button, Spin } from 'antd';
import ThreadForm from "./ThreadForm.js"
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
    console.log("ant forum post component did mount");
  }

  /**
  changes the state of the comment to show the reply form
  **/
  replyButtonClick() {
    this.setState({ replyClicked: !this.state.replyClicked});
  }


  render() {
    console.log(this.props.data);
    console.log(this.props)
    console.log("printing props above")
    let styleObject1 = { 
            width: "100%",
            display:"inline-block",
            "border-left": 0,
            "border-right": 0,
            "border-bottom": 0,
            "float": "right",
          }
    let styleObject1Padding = 50*(this.props.data["indentationLevel"]-1)
    let username = <span className="username-text">{this.props.data["username"]}</span>

    let descriptionObject = (
      <div>
        <span className="description-text">
        {this.props.data["comment"]}
        </span>      
        <br /> 
        <br /> 
        <div className="button" onClick={this.replyButtonClick}>REPLY</div> 
      </div>
    );

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

    

    return (
      <div className="post-container">
        <div className="card-holder" style={{"padding-left": styleObject1Padding}}>
          <Card style={styleObject1}>
            <Meta
              avatar={<Avatar size={50} style={{"border": "4px solid lightblue", "border-radius": "50%"}} src={this.props.data["profilePic"]} />}
              title={username}
              description={descriptionObject}
            />
          </Card>
        </div>
      </div>
    );
  }

}


export default AntForumPost;