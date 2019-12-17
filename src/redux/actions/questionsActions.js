export const FETCH_QUESTIONS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_PRODUCTS_SUCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export function fetchQuestionsBegin() {
	return { type: FETCH_QUESTIONS_BEGIN};
}

export function fetchQuestionsSucess(questions) {
	return { type: FETCH_QUESTIONS_SUCCESS, payload: {questions}};
}

export function fetchQuestionsFailure(error) {
	return { type: FETCH_QUESTIONS_FAILURE, payload: {error}};
}

export function fetchQuestions(){
	return dispatch => {
		dispatch(fetchQuestionsBegin());
		return fetch('http://localhost:8000/quizbank/api/v1/questions/?format=json')
			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchQuestionsSucess(json.questions));
				return json.questions;
			})
			.catch(error => dispatch(fetchQuestionsFailure(error)))
	}
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}