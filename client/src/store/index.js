import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        composeEnhancer(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga)

    return store;
}