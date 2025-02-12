import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { FriendContext } from '../contexts/FriendContext';

import { login } from '../utils/api';
import { getToken } from '../utils/api';


const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;

	text-align: center;

	h3 {
		font-size: 2.6rem;
		margin: 20px;
	}

	.error {
		font-size: 2rem;
		color: red;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 350px;
		margin-top: 10px;
		padding: 10px;
		border: 2px solid grey;
		border-radius: 10px;
	}

	label {
		font-size: 1.4rem;
		font-style: italic;
	}

	span {
		display: inline-block;
		text-align: right;
		width: 80px;
		margin-right: 5px;
	}

	input {
		font-size: 1.4rem;
		margin: 5px;
		padding: 5px;
	}


	button {
		height: 28px;
		background-color: #AAA;
		color: black;
		border: none;
		border-radius: 5px;
		width: 60px;
		font-size: 1.4rem;
		margin-top: 10px;

		&:hover {
			cursor: pointer;
			background-color: grey;
			color: white;
		}
	}
`;


const Login = (props) => {

	// dispatcher for login function
	const { dispatch } = useContext(FriendContext);

	const [error, setError] = useState();

	const [data, setData] = useState({
		username: '',
		password: ''
	});


	const handleChange = (e) => {
		setData({
			...data, [e.target.name]: e.target.value
		});
	};


	const handleSubmit = (e) => {
		e.preventDefault();

		if (!(data.username && data.password)) {
			setError('You must supply a username and password!');
		} else {
			login(data, setError, dispatch);
		}
	};


	// if we successfully logged in, go to friends display
	if (getToken()) {
		return  (<Redirect to='/friends' />);
	}

	return (
		<LoginWrapper>
			<h3>Log-in Page</h3>

			{error && <div className='error'>{error}</div>}

			<form onSubmit={handleSubmit}>

				<label name='username'><span>Userame:</span>
					<input type='text' name='username' placeholder='Username'
						value={data.username} onChange={handleChange} />
				</label>
				<label name='password'><span>Password:</span>
					<input type='password' name='password' placeholder='Password'
						value={data.password} onChange={handleChange} />
				</label>

				<button type='submit'>Log In</button>
			</form>
		</LoginWrapper>
	);

};

export default Login;
