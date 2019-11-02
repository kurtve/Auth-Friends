import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';


const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	margin-top: 30px;

	h1 {
		font-size: 4rem;
	}

`;


const App = () => {


	return (
		<h1>Auth-Friends</h1>
	);
};


export default App;
