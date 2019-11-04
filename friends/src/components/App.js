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
import FriendList from './FriendList';


const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;

	font-size: 2.4rem;
	text-align: center;

	h1 {
		font-size: 4rem;
		font-weight: bold;
		margin: 10px;
	}
`;


const App = () => {

	const loggedIn = getToken();

	const [friendState, dispatch] = useReducer(friendReducer, initialState);

	useEffect(() => {
		helpers.getFriends(dispatch);
	}, []);


	return (
		<FriendContext.Provider value={ {friendState, dispatch} }>
			<AppWrapper>
				<h1>Auth-Friends</h1>
				<nav>
					<Link to='/'>Home</Link>
					{loggedIn && <Link to='/friends'>Friends</Link>}
					{!loggedIn && <Link to='/login'>Login</Link>}
					{loggedIn && <Link to='/logout'>Logout</Link>}
				</nav>

				<Route exact path='/' component={Welcome} />
				<ProtectedRoute path='/friends' component={FriendList} />
				<ProtectedRoute path='/logout' component={Logout} />
				<Route path='/login' component={Login} />
			</AppWrapper>
		</FriendContext.Provider>
	);
};


export default withRouter(App);
