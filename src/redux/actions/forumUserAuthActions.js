export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

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
		dispatch(authStart())
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
			const token = json["key"];
			const expirationDate = new Date(new Date().getTime() + 3600*1000);
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);
			dispatch(authSuccess(token));
			dispatch(setAuthTimeout(3600*24));
		})
		.catch(err => {
			console.log("looks like we're failing to log in")
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
			console.log("the error is coming from forumuserauthactions!!")
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

