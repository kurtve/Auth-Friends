import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from '../reducers/friendReducer';
import axios from 'axios';


export const baseURL = 'http://localhost:5000';


export const getToken = () => {
	return localStorage.getItem('AF-token');
};

export const clearToken = () => {
	return localStorage.removeItem('AF-token');
};

export const setToken = (token) => {
	return localStorage.setItem('AF-token', token);
};


export const apiWithAuth = () => {
	return axios.create({
		baseURL: baseURL,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getToken()
		}
	});
};


export const login = (credentials, errorSetter, dispatch) => {

	dispatch({ type: LOGIN_START });
	axios.post(`${baseURL}/api/login`, credentials)
		.then(res => {
			setToken(res.data.payload);
			errorSetter('');
			dispatch({type: LOGIN_SUCCESS});
		})
		.catch(err => {
			if (err.response.status === 403) {
				errorSetter('Invalid username/password pair');
			} else {
				errorSetter('An error occurred. Please try again.');
			}
			dispatch({ type: LOGIN_FAILURE, payload: err.message });
		});
};


