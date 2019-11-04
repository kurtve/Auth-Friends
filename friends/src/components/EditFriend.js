import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { SmurfContext } from '../contexts/SmurfContext';
import * as helpers from './helperFunctions';


const ESFWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;

	font-size: 2.4rem;
	text-align: center;

	h3 {
		font-size: 3rem;
		margin: 20px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 350px;
		margin-top: 10px;
		padding: 10px;
		border: 2px solid royalblue;
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
			background-color: dodgerblue;
			color: white;
			border: none;
			border-radius: 5px;
			width: 80px;
			font-size: 1.6rem;

			&:hover {
				cursor: pointer;
			}
		}
	}
`;


const EditSmurf = (props) => {

	// get smurf state and dispatcher
	const { smurfState, dispatch } = useContext(SmurfContext);

	const id = Number.parseInt(props.match.params.id);

	// which smurf are we editing?
	const smurf = smurfState.smurfList.find(entry => entry.id === id);

	// initialize the form to current smurf values
	const [formState, setFormState] = useState(smurf);


	// if we didn't get a smurf, then the id was invalid.  return to list
	if (smurf === undefined) {
		props.history.push('/');
		return ( <p>Loading...</p> );
	}


	const submitForm = (e) => {
		e.preventDefault();
		if (!(formState.name && formState.age && formState.height)) {
			alert('You must supply a name, age, and height for your Smurf!');
			return;
		}
		helpers.editSmurf(formState, dispatch);
		props.history.push('/');
	};

	const discardEdits = (e) => {
		e.preventDefault();
		props.history.push('/');
	};


	const updateField = (e) => {
		setFormState( {...formState, [e.target.name]: e.target.value });
	};

	return (
		<ESFWrapper>
			<h3>Update Smurf information:</h3>
			<form onSubmit={submitForm} className='add-smurf'>
				<label name='name'><span>Name:</span>
					<input name='name' className='name' placeholder='Name'
						onChange={updateField} value={formState.name} />
				</label>
				<label name='age'><span>Age:</span>
					<input name='age' className='age' placeholder='Age'
						onChange={updateField} value={formState.age} />
				</label>
				<label name='height'><span>Height:</span>
					<input name='height' className='height' placeholder='Height'
						onChange={updateField} value={formState.height} />
				</label>
				<div className='button-bar'>
					<button onClick={e => submitForm(e)}>Save</button>
					<button onClick={e => discardEdits(e)}>Discard</button>
				</div>
			</form>
		</ESFWrapper>
	);
};

export default EditSmurf;
