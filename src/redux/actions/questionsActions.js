export const FETCH_QUESTIONS_BEGIN = 'FETCH_QUESTIONS_BEGIN';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';

export const fetchQuestionsBegin = () => ({
	type: FETCH_QUESTIONS_BEGIN
});

export function fetchQuestionsSuccess(questions){
	console.log('inside the action itself');
	console.log(questions);
	console.log(typeof questions);
	return {type: FETCH_QUESTIONS_SUCCESS, questions}
}

export function fetchQuestionsFailure(error) {
	return { type: FETCH_QUESTIONS_FAILURE, payload: {error}};
}

export function fetchQuestions(){
	return dispatch => {
		dispatch(fetchQuestionsBegin());
		// REMEMBER TO CHANGE THIS URL!!! TODO
		return fetch('http://localhost:8000/quizbank/api/v1/questions/?format=json')
		  .then(handleErrors)
		  .then(res => res.json())
		  .then(json => {
	        dispatch(fetchQuestionsSuccess(json));
	        return json;
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