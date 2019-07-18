import { combineReducers } from "redux";
import chat from '../chat/reducer'
import editPage from '../editPage/reducer'
import users from "../users/reducer";
import userPage from "../userPage/reducer";
import login from "../login/reducer";

const rootReducer = combineReducers({
    chat, editPage, users, userPage, login
});

export default rootReducer;