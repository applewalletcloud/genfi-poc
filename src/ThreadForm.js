import React from 'react';

// styles
import './ThreadForm.css';
import { Form } from 'react-bootstrap';
import { Button } from 'antd';

/*
This is the form that user input their comments into.
We keep track of the text that the user has typed in state,
then use it for when the user clicks the submit button.
This class is encapsulated by the AntForumPost component.
*/
class ThreadForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = { textValue: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // keeps track of the form contents in state
  handleChange(e) {
    this.setState({ textValue: e.target.value });
  }

  // takes in the props passed down by the encapsulating component (AntForumPost)
  // and combines it with the text entered by the user to create a new entry in
  // the django backend
  handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8000/quizbank/forumUserPost/', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'JWT ' + this.props.data['token'],
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        is_main_post: this.props.data['is_main_post'],
        main_post_id: this.props.data['main_post_id'],
        parent_id: this.props.data['parent_id'],
        creator: this.props.data['creator'],
        post_title: this.props.data['post_title'],
        post_text: this.state.textValue,
        indentation_level: this.props.data['indentation_level'],
      }),
    }).then((response) => response.text())
      .catch((error) => {
        console.error(error);
      });

    // refresh page after submitting
    window.location.reload();
  }

  // just renders a text form and a submit button
  render() {
    return (
      <>
        <div className="text-area-border">
          <Form onSubmit={this.handleSubmit}>
            <Form.Control as="textarea" className="text-form" placeholder="Input your thoughts here!" rows="3" onChange={this.handleChange} />
            <Button className="text-area-button" onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </div>
      </>
    );
  }
  
}

export default ThreadForm;
