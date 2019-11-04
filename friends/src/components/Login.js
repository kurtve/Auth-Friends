import React, { useState } from 'react';
import styled from 'styled-components';

import { login } from '../utils/api';


const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	margin-top: 30px;

	h1 {
		font-size: 4rem;
	}
`;


const Login = (props) => {

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
		console.log('inside login handleSubmit');
		login(data, setError);
		props.history.push('/');
	};


	return (
		<LoginWrapper>
			<h3>Log-in Page</h3>

			<form onSubmit={handleSubmit}>
				{error && <div className='error'>{error}</div>}

				<input type='text' name='username' placeholder='Username'
					value={data.username} onChange={handleChange} />
				<input type='password' name='password' placeholder='Password'
					value={data.password} onChange={handleChange} />
				<button type='submit'>Log In</button>
			</form>
		</LoginWrapper>
	);

};

export default Login;
