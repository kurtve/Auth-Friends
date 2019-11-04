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
	console.log('inside apiWithAuth');

	return axios.create({
		baseURL: baseURL,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getToken()
		}
	});
};


export const login = (credentials, errorSetter) => {
	console.log('inside login');

	axios.post(`${baseURL}/api/login`, credentials)
		.then(res => {
			setToken(res.data.payload);

			console.log('recieved token', res.data.payload);
		})
		.catch(err => {
			console.log(err);
			errorSetter(err);
		});
};


