import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { FriendContext } from '../contexts/FriendContext';
import Friend from './Friend';


const FLWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;

	font-size: 2.4rem;
	text-align: center;

	h3 {
		font-size: 3rem;
		margin: 10px;
	}
`;


const FriendList = (props) => {

	console.log('in FriendList');

	const { friendState } = useContext(FriendContext);

	console.log(friendState.friendList);

	return (
		<FLWrapper>
			<h3>Your Friends</h3>
			{friendState.friendList.map(friend => {
				return (<Friend key={friend.id} {...props} friend={friend} />);
			})}
		</FLWrapper>
	);
};


export default FriendList;
