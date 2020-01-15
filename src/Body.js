import React from 'react';
import './Body.css';
import MyColorfulSquare from './ColorfulSquare.js';
import QuestionBankTest from './QuestionBankTest.js';  

const API_HOST = 'http://localhost:8000/quizbank'
let _csrfToken = null;

async function getCsrfToken() {
	if (_csrfToken === null){
		const response = await fetch (API_HOST + '/csrf/', {
			credentials: 'include',
		});
		const data = await response.json();
		_csrfToken = data.csrfToken
	}
	return _csrfToken;
}

async function testRequest(method) {
	const response = await fetch(API_HOST + '/ping/', {
		credentials: 'include',
	});
	const data = await response.json();
	return data.result;
}

async function getTestArg(){
	const response = await fetch(API_HOST + '/test/1', {
		credentials: 'include',
	});
	const data = await response.json();
	return data;
}

async function myTestQuery(){
	const response = await fetch(API_HOST + '/myQuery/', {
		credentials: 'include',
	});
	const data = await response.json();
	return data.question;
}


async function testMyReduxThunk(){
  const response = await fetch('http://localhost:8000/quizbank/api/v1/questions/2/?format=json', {
    credentials: 'include',
  });
  const data = await response.json();
  return data.question_text;
}

async function myTestToDelete(){
  const dummyVar = await fetch('http://localhost:8000/quizbank/api/v1/questions/?format=json')
      .then(res => res.json())
      .then(json => {
          return json;
  })
  console.log(dummyVar);
  return dummyVar[1].question_text;
}

class Body extends React.Component {

  constructor(props) {
  	super(props);
  	this.state = {
      testGet: 'no value yet',
      testPost: 'no value yet',
      testArg: 'no value yet',
      testQuery: 'no value yet',
      testReduxThunk: 'no value uet',
      nothingworks: 'no value',
    };
  }

  async componentDidMount() {
    this.setState({
      testGet: await getCsrfToken(),
      testPost: await testRequest(),
      testArg: await getTestArg(),
      testQuery: await myTestQuery(),
      testReduxThunk: await testMyReduxThunk(),
      nothingworks: await myTestToDelete(),
    })
  }

  render() {
  	return (
  	  <React.Fragment>
        <div className="Body">
          <p> Below is a stateful square which randomly changes color as time passes! If you click on it, there's a callback to change the internal color. This is done through redux.</p>
          <MyColorfulSquare />
        </div>

        <div className="TestRequest Body">
          <p>Test GET Request: {this.state.testGet}</p>
          <p>Test POST Request: {this.state.testPost}</p>
          <p>Test Request w/ argument: {this.state.testArg}</p>
          <p>Test query w/ db: {this.state.testQuery}</p>
          <p> test redux w/ "thunk": {this.state.testReduxThunk}</p>
          <p> why does it appear here?: {this.state.nothingworks}</p>
        </div>
        <QuestionBankTest />
      </React.Fragment>
    );
  }
}

export default Body;