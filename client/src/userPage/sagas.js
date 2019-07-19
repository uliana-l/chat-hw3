import axios from 'axios';
import api from '../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./actionTypes";
import {authHeader} from '../helpers/header';

export function* fetchUser(action) {
    try {
        const user = yield call(axios.get, `${api.url}/user/${action.payload.id}`, {headers: {Authorization: authHeader}});
        yield put({ type: FETCH_USER_SUCCESS, payload: { userData: user.data } })
    } catch (error) {
        yield put({type: FETCH_USER_FAILURE, payload: error.message});
        console.log('fetchUsers error:', error.message)
    }
}

function* watchFetchUser() {
    yield takeEvery(FETCH_USER, fetchUser)
}

export default function* userPageSagas() {
    yield all([
        watchFetchUser()
    ])
};
