import { all } from 'redux-saga/effects';
import userPageSagas from '../userPage/sagas';
import usersSagas from '../users/sagas';
import messagesSagas from '../chat/sagas';
import editPageSagas from '../editPage/sagas';
import login from '../login/sagas';

export default function* rootSaga() {
    yield all([
        userPageSagas(),
        usersSagas(),
        messagesSagas(),
        editPageSagas(),
        login()
    ])
};