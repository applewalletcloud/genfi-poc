export const FETCH_TOPICS_BEGIN = 'FETCH_TOPICS_BEGIN';
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';

export const fetchTopicsBegin = () => ({
	type: FETCH_TOPICS_BEGIN
});

export function fetchTopicsSuccess(threadTopics){
	return {type: FETCH_TOPICS_SUCCESS, threadTopics}
}

export function fetchTopicsFailure(error) {
	return { type: FETCH_TOPICS_FAILURE, payload: {error}};
}

export function fetchThreadTopics(api_endpoint){
	return dispatch => {
		dispatch(fetchTopicsBegin());
		// REMEMBER TO CHANGE THIS URL!!! TODO
		return fetch(api_endpoint)
		  .then(handleErrors)
		  .then(res => res.json())
		  .then(json => {
	        dispatch(fetchTopicsSuccess(json));
	        return json;
	      })
		  .catch(error => dispatch(fetchTopicsFailure(error)))
	}
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}