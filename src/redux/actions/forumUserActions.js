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

export function fetchForumUserProfilePic(api_endpoint, username){
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
	        let temp = {
	        	username: username,
	        	url: url
	        }
	        console.log(temp)
	        dispatch(fetchForumUserDataSuccess(temp));
	        return temp;
	      })
		  .catch(error => dispatch(fetchForumUserDataFailure(error)))
	}
}



export function setForumUserProfilePic(api_endpoint, data){
	console.log(data)
	//console.log(data.dragger[0])
	console.log(api_endpoint)
	console.log("in teh action, we are printing the data and api endpoints above")
	let formData = new FormData();
	//fromData.append

	formData.append('user_name', data.username)
	console.log(data.dragger[0].originFileObj)
	formData.append('profile_pic', data.dragger[0].originFileObj, data.dragger[0].name)
	
	console.log(formData)
	console.log("FORM DATA ABOVE")
	return dispatch => {
		dispatch(fetchForumUserDataBegin());
		// REMEMBER TO CHANGE THIS URL!!! TODO
		return fetch(api_endpoint, {
			method: 'POST',
			body: formData, // not sure if we should have json stringify
		}
	  )
	  .then(handleErrors)
	  .then(res => res.json())
	  .then(json => {
	    //dispatch(fetchForumUserDataSuccess(blob));
	    console.log(json)
	    console.log("22222222222@)#$(@)#*$&(@#$&@#)$&@#*$)@##")
	    // probably need to change this later. shouldn't be the json variable being passed
	    //dispatch(fetchForumUserDataSuccess(data));
	    return json;
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