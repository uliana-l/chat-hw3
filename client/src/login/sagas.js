import axios from 'axios';
import api from '../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { CHECK_DATA, AUTH_SUCCEED, AUTH_FAILED } from './actionTypes'

export function* checkData(action) {
    const userData = { ...action.payload };
    console.log(userData);

	try {
        const result = yield call(axios.post, `${api.url}/login`, userData);
        localStorage.setItem('user', result.data.login);
        localStorage.setItem('jwt', result.data.user);
        yield put({type: AUTH_SUCCEED, payload: result.data});
	} catch (error) {
        yield put({type: AUTH_FAILED, payload: error.message});
		console.log('createMessage error:', error.message);
	}
}

function* watchCheckData() {
	yield takeEvery(CHECK_DATA, checkData);
}

export default function* loginSagas() {
    yield all([
        watchCheckData()
    ])
};