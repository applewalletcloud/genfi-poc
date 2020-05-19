/*
These set of actions are for the user to change their profile picture
*/

// variables to specify to the reducers what to do
export const FETCH_FORUM_USER_DATA_BEGIN = 'FETCH_FORUM_USER_DATA_BEGIN';
export const FETCH_FORUM_USER_DATA_SUCCESS = 'FETCH_FORUM_USER_DATA_SUCCESS';
export const FETCH_FORUM_USER_DATA_FAILURE = 'FETCH_FORUM_USER_DATA_FAILURE';

// action to set state to loading
export const fetchForumUserDataBegin = () => ({
  type: FETCH_FORUM_USER_DATA_BEGIN,
});

// action to update profile pic dictionary
export function fetchForumUserDataSuccess(forumUserData) {
  return { type: FETCH_FORUM_USER_DATA_SUCCESS, forumUserData };
}

// action to set state to failure
export function fetchForumUserDataFailure(error) {
  return { type: FETCH_FORUM_USER_DATA_FAILURE, payload: { error } };
}

// middleware action to fetch profile pic data from the backend
// and update the dictionary. it calls the actions above.
export function fetchForumUserProfilePic(apiEndpoint, username) {
  return dispatch => {
    // set redux state to loading
    dispatch(fetchForumUserDataBegin());

    // query the db for user profile pic
    return fetch(apiEndpoint)
      .then(handleErrors)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const temp = {
          username: username,
          url: url,
        };
        // switch state for success and update profile pic dictionary
        dispatch(fetchForumUserDataSuccess(temp));
        return temp;
      })
      .catch(error => dispatch(fetchForumUserDataFailure(error)));
  };
}

// middleware action to change profile pic data from the backend
// and update the dictionary. it calls the actions above.
export function setForumUserProfilePic(api_endpoint, data, user, token){
  // create form data object for post request
  const formData = new FormData();
  formData.append('user_name', user)
  formData.append('profile_pic', data.dragger[0].originFileObj, data.dragger[0].name)
  
  return dispatch => {
    // set state to loading
    dispatch(fetchForumUserDataBegin());
    return fetch(api_endpoint,
      {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'JWT ' + token,
        }),
        body: formData, 
      },
    )
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch(error => dispatch(fetchForumUserDataFailure(error)))
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
