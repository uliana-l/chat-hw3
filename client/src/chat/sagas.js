import axios from 'axios';
import api from '../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { ADD_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE, FETCH_DATA, FETCH_DATA_SUCCESS, 
	FETCH_USER, FETCH_USER_SUCCESS, FETCH_FAILURE } from "./actionTypes";
import {authHeader} from '../helpers/header';

export function* fetchData() {
	try {
		const messages = yield call(axios.get, `${api.url}/message`, {headers: { Authorization: authHeader }});
		const usersAmount = yield call(axios.get, `${api.url}/user/amount`, {headers: { Authorization: authHeader }});
		yield put({ type: FETCH_DATA_SUCCESS, payload: { data: messages.data, usersAmount: usersAmount.data.result } });
	} catch (error) {
		yield put({type: FETCH_FAILURE, payload: error.message});
		console.log('fetchData error:', error.message)
	}
}

function* watchFetchData() {
	yield takeEvery(FETCH_DATA, fetchData)
}

export function* addMessage(action) {
	const newMessage = { ...action.payload.data };

	try {
		yield call(axios.post, `${api.url}/message`, newMessage, {headers: { Authorization: authHeader }});
		yield put({ type: FETCH_DATA });
	} catch (error) {
		yield put({type: FETCH_FAILURE, payload: error.message});
		console.log('createMessage error:', error.message);
	}
}

function* watchAddMessage() {
	yield takeEvery(ADD_MESSAGE, addMessage)
}

export function* editMessage(action) {
	const id = action.payload.id;
	const editedMessage = action.payload.data;
	
	try {
		yield call(axios.put, `${api.url}/message/${id}`, editedMessage, {headers: { Authorization: authHeader }});
		yield put({ type: FETCH_DATA });
	} catch (error) {
		yield put({type: FETCH_FAILURE, payload: error.message});
		console.log('updateMessage error:', error.message);
	}
}

function* watchEditMessage() {
	yield takeEvery(EDIT_MESSAGE, editMessage)
}

export function* deleteMessage(action) {
	try {
		yield call(axios.delete, `${api.url}/message/${action.payload.id}`, {headers: { Authorization: authHeader }});
		yield put({ type: FETCH_DATA })
	} catch (error) {
		yield put({type: FETCH_FAILURE, payload: error.message});
		console.log('deleteMessage Error:', error.message);
	}
}

function* watchDeleteMessage() {
	yield takeEvery(DELETE_MESSAGE, deleteMessage)
}

export function* fetchUser(action) {
    try {
		const user = yield call(axios.get, `${api.url}/user/${action.payload.id}`, {headers: { Authorization: authHeader }});
        yield put({ type: FETCH_USER_SUCCESS, payload: { userData: user.data } })
    } catch (error) {
		yield put({type: FETCH_FAILURE, payload: error.message});
        console.log('fetchUsers error:', error.message)
    }
}

function* watchFetchUser() {
    yield takeEvery(FETCH_USER, fetchUser)
}

export default function* messagesSagas() {
	yield all([
		watchFetchData(),
		watchAddMessage(),
		watchEditMessage(),
		watchDeleteMessage(),
		watchFetchUser()
	])
};
