/*
These set of actions are for querying forum posts from the db
*/

// variables to specify to the reducers what to do
export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// action to have state reflect loading status
export function fetchPostsBegin() {
  return { type: FETCH_POSTS_BEGIN };
}

// action that has state reflect the forum posts queried from the db
export function fetchPostsSuccess(threadPosts) {
  return { type: FETCH_POSTS_SUCCESS, threadPosts };
}

// action to have the redux state reflect that an error occurred
export function fetchPostsFailure(error) {
  return { type: FETCH_POSTS_FAILURE, payload: { error } };
}

// action to query the django backend
// uses the actions defined above within it
export function fetchThreadPosts(apiEndpoint){
  return (dispatch) => {
    // set state to loading
    dispatch(fetchPostsBegin());

    // query the backend for the data
    return fetch(apiEndpoint)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchPostsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchPostsFailure(error)))
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}