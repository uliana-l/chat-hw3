import { FETCH_DATA, ADD_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE, FETCH_USER } from './actionTypes'

export const fetchData = () => ({
    type: FETCH_DATA
});

export const addMessage = data => ({
    type: ADD_MESSAGE,
    payload: {
        data
    }
});

export const deleteMessage = id => ({
    type: DELETE_MESSAGE,
    payload: {
        id
    }
});

export const editMessage = (id, data) => ({
    type: EDIT_MESSAGE,
    payload: {
        data,
        id
    }
});

export const fetchUser = id => ({
    type: FETCH_USER,
    payload: {
        id
    }
});