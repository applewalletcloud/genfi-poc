/*
These set of actions are for querying forum posts from the db.
very similar to threadpostsactions, except we want to keep track of
the main posts separately in our state for our forum home page
*/

// variables to specify to the reducers what to do
export const FETCH_TOPICS_BEGIN = 'FETCH_TOPICS_BEGIN';
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';

// action to have redux state reflect loading status
export const fetchTopicsBegin = () => ({
  type: FETCH_TOPICS_BEGIN,
});

// action to have redux state reflect newly queried data
export function fetchTopicsSuccess(threadTopics) {
  return { type: FETCH_TOPICS_SUCCESS, threadTopics };
}

// action to have redux state reflect error received from query
export function fetchTopicsFailure(error) {
  return { type: FETCH_TOPICS_FAILURE, payload: { error } };
}

// action to fetch the data from the backend and update redux state accordingly
// this uses the actions above (thunk middle ware)
export function fetchThreadTopics(apiEndpoint) {
  return (dispatch) => {
    // set state to loading
    dispatch(fetchTopicsBegin());
    // query the backend
    return fetch(apiEndpoint)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        // update redux state with our new information
        dispatch(fetchTopicsSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchTopicsFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}