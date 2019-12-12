import React, { useContext } from 'react';
import styled from 'styled-components';
import { FriendContext } from '../contexts/FriendContext';
import * as helpers from '../utils/helperFunctions';


const FriendWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px;
	padding: 10px;

	background-color: lightgrey;
	color: black;
	width: 340px;
	border-radius: 10px;
	border: 1px solid grey;

	p {
		margin: 5px;
		font-size: 1.8rem;
	}

	.name {
		font-size: 2.4rem;
	}

	.button-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		margin-top: 5px;
		padding: 5px;

		button {
			height: 20px;
			background-color: #AAA;
			color: black;
			border: none;
			border-radius: 5px;
			width: 50px;
			font-size: 1.2rem;

			&:hover {
				cursor: pointer;
				background-color: grey;
				color: white;
			}
		}
	}

`;


const Friend = (props) => {

	// dispatcher for delete function
	const { dispatch } = useContext(FriendContext);

	const deleteFriend = (e) => {
		e.preventDefault();
		helpers.deleteFriend(props.friend.id, dispatch);
	};

	const editFriend = (e) => {
		e.preventDefault();
		props.history.push(`/edit/${props.friend.id}`);
	};


	return (
		<FriendWrapper>
			<p className='name'>{props.friend.name}</p>
			<p className='age'>Age: {props.friend.age}</p>
			<p className='email'>{props.friend.email}</p>
			<div className='button-bar'>
				<button onClick={e => editFriend(e)}>Edit</button>
				<button onClick={e => deleteFriend(e)}>Delete</button>
			</div>
		</FriendWrapper>
	);
};

export default Friend;
