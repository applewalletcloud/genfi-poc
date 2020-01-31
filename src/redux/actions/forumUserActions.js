// maybe we don't need any of this and it can all be handled with the jwt

export const FETCH_FORUM_USERS_BEGIN = 'FETCH_FORUM_USERS_BEGIN';
export const FETCH_FORUM_USERS_SUCCESS = 'FETCH_FORUM_USERS_SUCCESS';
export const FETCH_FORUM_USERS_FAILURE = 'FETCH_FORUM_USERS_FAILURE';

export const fetchForumUsersBegin = () => ({
	type: FETCH_FORUM_USERS_BEGIN
});

export function fetchForumUsersSuccess(forumUsers){
	console.log('inside the action itself');
	console.log(forumUsers);
	console.log(typeof questions);
	return {type: FETCH_FORUM_USERS_SUCCESS, forumUsers}
}

export function fetchForumUsersFailure(error) {
	return { type: FETCH_FORUM_USERS_FAILURE, payload: {error}};
}

export function fetchForumUsers(api_endpoint){
	return dispatch => {
		dispatch(fetchForumUsersBegin());
		// REMEMBER TO CHANGE THIS URL!!! TODO
		return fetch(api_endpoint)
		  .then(handleErrors)
		  .then(res => res.json())
		  .then(json => {
	        dispatch(fetchForumUsersSuccess(json));
	        return json;
	      })
		  .catch(error => dispatch(fetchForumUsersFailure(error)))
	}
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
  	console.log("this error is from forumUserActions")
    throw Error(response.statusText);
  }
  return response;
}