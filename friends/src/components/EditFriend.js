import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FriendContext } from '../contexts/FriendContext';
import * as helpers from '../utils/helperFunctions';


const EFWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;

	text-align: center;

	h3 {
		font-size: 2.8rem;
		margin: 20px;
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
		font-size: 1.8rem;
		font-style: italic;
	}

	span {
		display: inline-block;
		text-align: right;
		width: 60px;
	}

	input {
		font-size: 1.6rem;
		margin: 5px;
		padding: 5px;
	}

	.button-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		margin-top: 10px;
		padding: 10px;

		button {
			height: 30px;
			background-color: #AAA;
			color: black;
			border: none;
			border-radius: 5px;
			width: 80px;
			font-size: 1.6rem;

			&:hover {
				cursor: pointer;
				background-color: grey;
				color: white;
			}
		}
	}
`;


const EditFriend = (props) => {

	// get friend state and dispatcher
	const { friendState, dispatch } = useContext(FriendContext);

	const id = Number.parseInt(props.match.params.id);

	// which friend are we editing?
	const friend = friendState.friendList.find(entry => entry.id === id);

	// initialize the form to current friend values
	const [formState, setFormState] = useState(friend);


	// if we didn't get a friend, then the id was invalid.  return to list
	if (friend === undefined) {
		props.history.push('/friends');
		return ( <p>Loading...</p> );
	}


	const submitForm = (e) => {
		e.preventDefault();
		if (!(formState.name && formState.age && formState.email)) {
			alert('You must supply a name, age, and email for your friend!');
			return;
		}
		helpers.editFriend(formState, dispatch);
		props.history.push('/friends');
	};

	const discardEdits = (e) => {
		e.preventDefault();
		props.history.push('/friends');
	};


	const updateField = (e) => {
		setFormState( {...formState, [e.target.name]: e.target.value });
	};

	return (
		<EFWrapper>
			<h3>Update Friend Information:</h3>
			<form onSubmit={submitForm} className='add-friend'>
				<label name='name'><span>Name:</span>
					<input name='name' className='name' placeholder='Name'
						onChange={updateField} value={formState.name} />
				</label>
				<label name='age'><span>Age:</span>
					<input name='age' className='age' placeholder='Age'
						onChange={updateField} value={formState.age} />
				</label>
				<label name='email'><span>Email:</span>
					<input name='email' className='email' placeholder='Email'
						onChange={updateField} value={formState.email} />
				</label>
				<div className='button-bar'>
					<button onClick={e => submitForm(e)}>Save</button>
					<button onClick={e => discardEdits(e)}>Discard</button>
				</div>
			</form>
		</EFWrapper>
	);
};

export default EditFriend;
