import React, { useReducer, useEffect } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { getToken } from '../utils/api';
import * as helpers from '../utils/helperFunctions';
import { friendReducer, initialState } from '../reducers/friendReducer';
import { FriendContext } from '../contexts/FriendContext';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Logout from './Logout';
import Welcome from './Welcome';
import AddFriend from './AddFriend';
import EditFriend from './EditFriend';
import FriendList from './FriendList';


const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	.nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		height: 80px;
		background-color: lightgrey;

		h3 {
			font-size: 3.4rem;
			font-weight: bold;
			margin: 10px;
		}

		a {
			font-size: 1.8rem;
			text-decoration: none;
			color: #333;

			&:hover {
				font-weight: bold;
				cursor: pointer;
			}
		}
	}
`;


const App = () => {

	const loggedIn = getToken();

	const [friendState, dispatch] = useReducer(friendReducer, initialState);

	useEffect(() => {
		helpers.getFriends(dispatch);
	}, [friendState.loggedIn]);


	return (
		<FriendContext.Provider value={ {friendState, dispatch} }>
			<AppWrapper>
				<div className='nav'>
					<h3>Friends!</h3>
					<Link to='/'>Home</Link>
					{loggedIn && <Link to='/friends'>Friends</Link>}
					{!loggedIn && <Link to='/login'>Login</Link>}
					{loggedIn && <Link to='/logout'>Logout</Link>}
				</div>

				<Route exact path='/' component={Welcome} />
				<ProtectedRoute path='/friends' component={FriendList} />
				<ProtectedRoute path='/logout' component={Logout} />
				<ProtectedRoute path='/edit/:id' component={EditFriend} />
				<ProtectedRoute path='/add' component={AddFriend} />
				<Route path='/login' component={Login} />
			</AppWrapper>
		</FriendContext.Provider>
	);
};


export default withRouter(App);
