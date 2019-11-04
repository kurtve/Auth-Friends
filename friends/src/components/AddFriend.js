import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { SmurfContext } from '../contexts/SmurfContext';
import * as helpers from './helperFunctions';


const ASFWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;

	font-size: 2.4rem;
	text-align: center;

	h3 {
		font-size: 3rem;
		margin: 10px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 350px;
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


const AddSmurfForm = () => {

	// local state for form fields
	const initialFormState = { name: '', age: '', height: '' };
	const [formState, setFormState] = useState(initialFormState);

	// dispatcher for submit function
	const { dispatch } = useContext(SmurfContext);


	const submitForm = (e) => {
		e.preventDefault();
		if (!(formState.name && formState.age && formState.height)) {
			alert('You must supply a name, age, and height for your Smurf!');
			return;
		}
		helpers.addSmurf(formState, dispatch);
		resetForm(e);
	};

	const updateField = (e) => {
		setFormState( {...formState, [e.target.name]: e.target.value });
	};

	const resetForm = (e) => {
		e.preventDefault();
		setFormState(initialFormState);
	};

	return (
		<ASFWrapper>
			<h3>Enter a New Smurf here:</h3>
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
					<button onClick={e => submitForm(e)}>Submit</button>
					<button onClick={e => resetForm(e)}>Clear</button>
				</div>
			</form>
		</ASFWrapper>
	);
};

export default AddSmurfForm;
