/*
These set of actions are for the user to login, logout, and sign up
*/

// variables to specify to the reducers what to do
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_USER = 'SET_USER';


/**
refreshes/sets our redux state to reflect the user that is logged in or just logged in
**/
export const setUser = (token) => {
  return dispatch => {
    fetch('http://localhost:8000/quizbank/getUserAuthentication/?format=json', {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'JWT ' + token['token'], 
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(setUserHelper(json.user, json.token));
      });
  };
};

// helper action for the set user async action above!
export const setUserHelper = (user, token) => {
  return {
    type: SET_USER,
    user: user,
    token: token,
  };
};


// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// action to set state to loading
export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

// action to update state to reflect the user's token
export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
  };
};

// action to have state reflect the error when querying the db
export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

// action to have state reflect the user is logged out
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
};

// set timeout for when the user gets automatically logged out
export const setAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

/**
Logs the user into our django backend given a username and password.
**/
export const authLogin = (username, password) => {
  return dispatch => {
    // set state to loading
    dispatch(authStart());
    // login in via django using data user specified in form
    fetch('http://localhost:8000/api-token-auth/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        'username': username,
        'password': password,
      }),
    })
      .then(res => res.json())
      .then(json => {
        const token = json;
        // if there was an error logging in, then dispatch an action to have our state reflect failure
        if(json['non_field_errors'] && json['non_field_errors'][0] == 'Unable to log in with provided credentials.') {
          dispatch(authFail('unable to log in with credentials'));
        } else {
          // we successfully logged in! so we set our local storage and redux state to reflect the user
          // that has been authenticated
          const expirationDate = new Date(new Date().getTime() + 3600 * 24);
          window.localStorage.setItem('token', token['token']);
          window.localStorage.setItem('expirationDate', expirationDate);
          dispatch(authSuccess(token['token']));
          dispatch(setAuthTimeout(3600 * 24));
          dispatch(setUser(json));
        }
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

/**
Action that logs the user into our django backend once they log in via a social network. 
If the user doesn't have an account already, one will be created for that individual.
**/
export const authSocialLogin = (socialProvider, accessToken) => {
  return dispatch => {
    // tell redux state that we're starting the social login process
    dispatch(authStart());

    // construct api endpoint for social login
    const api_endpoint = "http://localhost:8000/quizbank/rest-auth/" + socialProvider + "/";
    
    // query django backend for user JWT
    fetch(api_endpoint, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        'access_token': accessToken,
      }),
    })
      .then((res) => {
        // if the query is successful
        if (res.ok) {
          res.json().then((json) => {
            // set state and localstorage to reflect a user is logged in
            const token = json.token;
            const expirationDate = new Date(new Date().getTime() + 3600 * 24);
            window.localStorage.setItem('token', json["token"]);
            window.localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token['token']));
            dispatch(setAuthTimeout(3600 * 24));
            dispatch(setUser(json));
          });
        }
      }).catch(err => {
        dispatch(authFail(err));
      });
  };
};

// action for user to sign up and make an account in our django backend
export const authSignUp = (username, email, password1, password2) => {
  return (dispatch) => {
    // set state to loading
    dispatch(authStart());
    // post request to make the new account
    fetch("http://localhost:8000/rest-auth/registration/", {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        'username': username,
        'email': email,
        'password1': password1,
        'password2': password2
      }),
    })
      .then(res => {
        if(res['status'] == 201) { // 201 is a successful create code
          // temporarily make the token prop equal to success until we log in.
          // the success value in the token prop tells our website to log in, so don't change this.
          dispatch(authSuccess('success'));
          dispatch(authLogin(username, password1));
        } else {
          dispatch(authFail("Please use different account credentials."));
        }
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

/*
action checks to make sure the user should still be logged in
if the user shouldn't, then it logs the user out
*/
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(setAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};
