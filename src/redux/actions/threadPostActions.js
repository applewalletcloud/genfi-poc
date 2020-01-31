export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export function fetchPostsBegin(){
	return {type: FETCH_POSTS_BEGIN}
};

export function fetchPostsSuccess(threadPosts){
	return {type: FETCH_POSTS_SUCCESS, threadPosts}
}

export function fetchPostsFailure(error) {
	return { type: FETCH_POSTS_FAILURE, payload: {error}};
}

export function fetchThreadPosts(api_endpoint){
	return dispatch => {
		dispatch(fetchPostsBegin());
		// REMEMBER TO CHANGE THIS URL!!! TODO
		console.log(api_endpoint)
		return fetch(api_endpoint)
		  .then(handleErrors)
		  .then(res => res.json())
		  .then(json => {
	        dispatch(fetchPostsSuccess(json));
	        return json;
	      })
		  .catch(error => dispatch(fetchPostsFailure(error)))
	}
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}