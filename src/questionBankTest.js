import React from "react";
import { connect } from "react-redux";
import { fetchQuestions } from "./redux/actions/questionsActions.js";

class QuestionBankTest extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchQuestions());
  }

  render() {
  	if(this.props.error){
  		return <div>Error! {this.props.error.message}</div>;
  	}
  	if(this.props.loading){
  		return <div>Loading...</div>;
  	}
  	return (
        <p> Hellow! this is mah question bank test! {this.props.questions.map(question =>
          <li key={question.id}>{question.question_text}</li>
        )}</p>
  	);
  	
  }

}
const mapStateToProps = state => ({
	questions: state.questions.questions,
	loading: state.questions.loading,
	error: state.questions.error
})

export default connect(mapStateToProps)(QuestionBankTest);
