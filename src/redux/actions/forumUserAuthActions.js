export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_USER = 'SET_USER';



export const setUser = (token) => {
	console.log("setUser is being called from the forumUserAuthAction");
	console.log(token);
	console.log(token["token"]);
	return dispatch => {
		fetch('http://localhost:8000/quizbank/getUserAuthentication/?format=json', {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'JWT ' + token["token"], // editing this line from '+ token' to '+ token["token"]' this fixed it!
				'Content-Type': 'application/json'
			}),
		})
		.then(res => res.json())
		.then(json => {
			console.log("json token is below!")
			console.log(json.token)
			dispatch(setUserHelper(json.token))
		})
	}
}


export const setUserHelper = (token) => {
	return {
		type: SET_USER,
		user: token
	}
}


// Handle HTTP errors since fetch won't.
function handleErrors(response) {
console.log("WE ARE ENTERING THE HANDLE ERRORS IN FORUM USER AUTH ACTION")
  if (!response.ok) {
  	console.log("WE ARE ENTERING THE HANDLE ERRORS IN FORUM USER AUTH ACTION")
    throw Error(response.statusText);
  }
  return response;
}


export const authStart = () => {
	return {
		type: AUTH_START
	}
}

export const authSuccess = (token) => {
	console.log(token);
	return {
		type: AUTH_SUCCESS,
		token: token
	}
}

export const authFail = (error) => {
	console.log(error);
	return {
		type: AUTH_FAIL,
		error: error
	}
}

export const logout = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('expirationDate');
	return {
		type: AUTH_LOGOUT
	}
}

export const setAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000)
	}
}

export const authLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart());
		fetch("http://localhost:8000/rest-auth/login/", {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({
				"username": username,
				"password": password
			})
		})
		.then(res => res.json())
		.then(json => {
			//const token = json["token"];
			const token = json;
			console.log("inside forumuserauthactions, printing json and token below!")
			console.log(json)
			console.log(json["non_field_errors"])
			if(json["non_field_errors"] && json["non_field_errors"][0] == "Unable to log in with provided credentials."){
				console.log("we entered the error case")
				dispatch(authFail("unable to log in with credentials"));
			} else {
				console.log("we entered the success case");
				console.log(token);
				const expirationDate = new Date(new Date().getTime() + 3600*1000);
				console.log(token);
				console.log("what is above should be getting set in local storage");
				localStorage.setItem('token', token["token"]);
				localStorage.setItem('expirationDate', expirationDate);
				console.log("what is being set in redux should be blelow");
				console.log(token["token"]);
				dispatch(authSuccess(token["token"]));
				dispatch(setAuthTimeout(3600*24));

				dispatch(setUser(json));

			}
			
		})
		.catch(err => {
			dispatch(authFail(err));
		})

	}
}



export const authSignUp = (username, email, password1, password2) => {
	return dispatch => {
		dispatch(authStart())
		fetch("http://localhost:8000/rest-auth/registration/", {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({
				"username": username,
				"email": email,
				"password1": password1,
				"password2": password2
			})
		})
		.then(res => {
			const token = res.data.key;
			const expirationDate = new Date(new Date().getTime() + 3600*1000);
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);
			dispatch(authSuccess(token));
			dispatch(setAuthTimeout(3600*24));
		})
		.catch(err => {
			dispatch(authFail(err));
		})

	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (token === undefined) {
			dispatch(logout());
		} else{
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()){
				dispatch(logout());
			} else{
				dispatch(authSuccess(token));
				dispatch(setAuthTimeout( (expirationDate.getTime() - new Date().getTime() )/1000));
			}
		}
	}
}

