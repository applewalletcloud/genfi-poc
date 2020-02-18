// maybe we don't need any of this and it can all be handled with the jwt

export const FETCH_FORUM_USER_DATA_BEGIN = 'FETCH_FORUM_USER_DATA_BEGIN';
export const FETCH_FORUM_USER_DATA_SUCCESS = 'FETCH_FORUM_USER_DATA_SUCCESS';
export const FETCH_FORUM_USER_DATA_FAILURE = 'FETCH_FORUM_USER_DATA_FAILURE';

export const fetchForumUserDataBegin = () => ({
	type: FETCH_FORUM_USER_DATA_BEGIN
});

export function fetchForumUserDataSuccess(forumUserData){
	console.log("in the user data success action. below is the argument passed")
	return {type: FETCH_FORUM_USER_DATA_SUCCESS, forumUserData}
}

export function fetchForumUserDataFailure(error) {
	return { type: FETCH_FORUM_USER_DATA_FAILURE, payload: {error}};
}

export function fetchForumUserProfilePic(api_endpoint){
	return dispatch => {
		dispatch(fetchForumUserDataBegin());
		// REMEMBER TO CHANGE THIS URL!!! TODO
		return fetch(api_endpoint)
		  .then(handleErrors)
		  .then(res => res.blob())
		  .then(blob => {
	        //dispatch(fetchForumUserDataSuccess(blob));
	        console.log(blob)
	        let url = URL.createObjectURL(blob)
	        console.log("@)#$(@)#*$&(@#$&@#)$&@#*$)@##")
	        console.log(url)
	        dispatch(fetchForumUserDataSuccess(url));
	        return url;
	      })
		  .catch(error => dispatch(fetchForumUserDataFailure(error)))
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