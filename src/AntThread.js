import React from 'react';
import { Table, Divider, Tag } from 'antd';
import "./AntThread.css"

import { fetchThreadPosts } from "./redux/actions/threadPostActions.js";

import PropTypes from 'prop-types';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Thread from './Thread.js'
import { fetchThreadTopics } from "./redux/actions/threadTopicActions.js";
import { connect } from "react-redux";

import UserProfileSummary from './UserProfileSummary.js'
import avatarImage from './tempImages/tempAvatar.jpg'

import ThreadForm from './ThreadForm.js'


import { Input } from 'antd';

const { TextArea } = Input;




/**
probably make it so that the first post is much larger than the rest, maybe even formatted differently
also still need to add the form at the bottom
**/

// Here we define all the columns to be in the table
const columns = [
  {
    dataIndex: 'userData',
    key: 'userData',
    render: userData =>
    <span className="vertical-align-top">
    <span>{userData.img} {userData.username}</span>
    </span>,

  },
  {
    dataIndex: 'postText',
    key: 'postText',
  },
  
];

class AntThread extends React.Component {
  componentDidMount(){
    //this.props.dispatch(fetchThreadPosts('http://localhost:8000/quizbank/api/v1/threadposts/?format=json'));
    // need to get current user logged in info
  }
  render (){
    /** 
    generate data for the table from the queries
    **/
    console.log("threadID props for antthread below")
    console.log(this.props.threadID)

    if(this.props.error){
      return <div>Error! {this.props.error.message}</div>;
    }
    if(this.props.loading){
      return <div>Loading...</div>;
    }
    let data2 = []
    let allPosts = this.props.threadPosts;
    console.log(allPosts)
    console.log(allPosts[0].thread_topic)
    console.log(this.props.threadID)
    allPosts.forEach(function (post){
      console.log(post.thread_topic)
    })
    allPosts = allPosts.filter(post => post.thread_topic-1 == this.props.threadID); // the threadID is 0 indexed while the thread_topics start at 1
    if (allPosts.length == 0){
      // TODO: make it so we assign a new threadID somehow
    }

    allPosts.forEach(function (post) {
      let tempObj = {
        img: <img className="avatar" src={avatarImage}></img>,
        username: 'narutofan93'
      }
      tempObj["userData"] = tempObj
      tempObj["postText"]= post.thread_text;
      data2.push(tempObj);
    });
    

    return (
      <>
        <Table columns={columns} dataSource={data2} pagination={false} bordered title={false}/>
        <ThreadForm threadID={this.props.threadID} className = "ant-table"/>
      </>
    );
  }
}


const mapStateToProps = state => ({
  threadPosts: state.threadPosts.threadPosts,
  loading: state.threadTopics.loading,
  error: state.threadTopics.error
})

export default connect(mapStateToProps)(AntThread);


