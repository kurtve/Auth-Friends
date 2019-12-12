import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FriendContext } from '../contexts/FriendContext';
import Friend from './Friend';


const FLWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;

	text-align: center;

	h3 {
		font-size: 2.8rem;
		margin: 10px;
	}

	a {
		height: 30px;
		background-color: #AAA;
		color: black;
		border: none;
		border-radius: 5px;
		width: 120px;
		font-size: 1.6rem;
		text-decoration: none;
		padding: 7px;
		margin: 10px;

		&:hover {
			cursor: pointer;
			background-color: grey;
			color: white;
		}		
	}
`;


const FriendList = (props) => {

	const { friendState } = useContext(FriendContext);

	return (
		<FLWrapper>
			<h3>Your Friends</h3>
			<Link to='/add'>Add a Friend</Link>
			{friendState.friendList.map(friend => {
				return (<Friend key={friend.id} {...props} friend={friend} />);
			})}
		</FLWrapper>
	);
};


export default FriendList;
