import { LOAD_START, LOAD_SUCCESS, LOAD_FAILURE } from '../reducers/friendReducer';
import { ADD_START, ADD_SUCCESS, ADD_FAILURE } from '../reducers/friendReducer';
import { DELETE_START, DELETE_SUCCESS, DELETE_FAILURE } from '../reducers/friendReducer';
import { EDIT_START, EDIT_SUCCESS, EDIT_FAILURE } from '../reducers/friendReducer';
import { apiWithAuth } from './api';


// Note: the back-end sends the complete list of friends for each successful call to
// GET /api/friends, POST /api/friends, PUT /api/friends/:id, DELETE /api/friends/:id

export const getFriends = (dispatch) => {
	dispatch({type: LOAD_START});
	apiWithAuth()
    	.get('/api/friends')
    	.then(res => {
        	dispatch({type: LOAD_SUCCESS, payload: res.data});
    	})
    	.catch(err => {
    		dispatch({type: LOAD_FAILURE, payload: err});
    	});
};


export const addFriend = (friend, dispatch) => {
	dispatch({type: ADD_START});
	apiWithAuth()
    	.post('/api/friends', friend)
    	.then(res => {
        	dispatch({type: ADD_SUCCESS, payload: res.data});
      	})
    	.catch(err => {
      		dispatch({type: ADD_FAILURE, payload: err});
	    });
};


export const deleteFriend = (id, dispatch) => {
    dispatch({type: DELETE_START});
    apiWithAuth()
        .delete(`api/friends/${id}`)
        .then(res => {
            dispatch({type: DELETE_SUCCESS, payload: res.data});
        })
        .catch(err => {
            dispatch({type: DELETE_FAILURE, payload: err});
        });
};


export const editFriend = (friend, dispatch) => {
    dispatch({type: EDIT_START});
    apiWithAuth()
        .put(`/api/friends/${friend.id}`, friend)
        .then(res => {
            dispatch({type: EDIT_SUCCESS, payload: res.data});
        })
        .catch(err => {
            dispatch({type: EDIT_FAILURE, payload: err});
        });
};

