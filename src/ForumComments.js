import React from 'react';

// styles
import "./ForumComments.css";

// react router
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

// lower level component that composes each individual comment
import AntForumPost from './AntForumPost';

/*
Component to render all the comments for a particular forum.
The data is passed by the encapsulating component, ForumBoard.
*/
class ForumComments extends React.Component {
  constructor(props) {
    super(props);
    this.buildTree = this.buildTree.bind(this);
    this.convertTreeToPosts = this.convertTreeToPosts.bind(this);
  }

  /**
  Takes in a list of post data from the database, sorted by ts.
  Outputs a list with a tree structure that can be DFSed for our comment order.
  **/
  buildTree(data) {
    // data is a list of objects that has already been filtered by thread topic
    // want to return an object we can dfs and make our list of comments
    const tree = [];
    const idToPost = {};
    let currObj;
    for (let i = 0; i < data.length; i += 1) {
      currObj = data[i];
      currObj.children = []; // add children key to object
      if (currObj.parent_id in idToPost) {
        const parent = idToPost[currObj.parent_id];
        parent.children.push(currObj);
      } else {
        tree.push(currObj);
      }
      idToPost[currObj.post_id] = currObj;
    }
    return tree;
  }

  /**
  We dfs through the data with a tree structure and return an array
  filled with our posts in the order we want to display them
  **/
  convertTreeToPosts(data) {
    const commentArray = [];
    for (const object of data) {
      const stack = [object];
      while (stack.length) {
        const curr = stack.pop();
        // turn curr into an antforumpost then add it to the comment array
        commentArray.push(<AntForumPost data={curr} />);
        for (let i = curr.children.length - 1; i >= 0; i -= 1) {
          const currChild = curr.children[i];
          stack.push(currChild);
        }
      }
    }
    return commentArray;
  }


  render() {
    const myTree = this.buildTree(this.props.data);
    const commentsArray = this.convertTreeToPosts(myTree);
    // render the comments if they exist
    if (this.props.data.length > 0) {
      return (
        <>
          <div className="comments-container">
            <h2>Comments</h2>
            {commentsArray}
          </div>
        </>
      );
    } else {
      // render text that tells the user to be the first to comment!
      return (
        <p1 className="center"> Be the first the comment! </p1>
      );
    }
  }
}

export default ForumComments;
