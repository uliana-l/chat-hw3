import axios from 'axios';
import api from '../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { FETCH_MESSAGE, FETCH_MESSAGE_SUCCESS, FETCH_MESSAGE_FAILURE } from "./actionTypes";
import {authHeader} from '../helpers/header';

export function* fetchMessage(action) {
    try {
        const message = yield call(axios.get, `${api.url}/message/${action.payload.id}`, {headers: { Authorization: authHeader }});
        yield put({ type: FETCH_MESSAGE_SUCCESS, payload: { messageData: message.data } })
    } catch (error) {
        yield put({type: FETCH_MESSAGE_FAILURE, payload: error.message});
        console.log('fetchMessages error:', error.message)
    }
}

function* watchFetchMessage() {
    yield takeEvery(FETCH_MESSAGE, fetchMessage)
}

export default function* editPageSagas() {
    yield all([
        watchFetchMessage()
    ])
};