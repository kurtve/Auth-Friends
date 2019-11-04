import React from "react";
import styled from 'styled-components';


const WelcomeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	margin-top: 40px;
	text-align: center;

	h1 {
		font-size: 3.4rem;
		margin: 20px;
	}

	h3 {
		font-size: 2.8rem;
		margin: 20px;
	}
`;


const Welcome = (props) => {

	return (
		<WelcomeWrapper>
			<h1>Welcome to the Friends!</h1>
			<h3>The App to track all your friends</h3>
		</WelcomeWrapper>
	)
}


export default Welcome;
