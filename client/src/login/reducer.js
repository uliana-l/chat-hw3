import { AUTH_SUCCEED, AUTH_FAILED, CHECK_DATA, CLEAR } from "./actionTypes";

const initialState = {
    auth: false,
    user: '',
    login: '',
    loading: false,
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCEED: {
            const { auth, user, login } = action.payload;
            return {
                ...state,
                loading: false,
                auth,
                user, 
                login
            };
        }

        case CHECK_DATA: {
            return {
                ...state,
                loading: true
            };
        }

        case AUTH_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case CLEAR: {
            return {
                initialState
            }
        }

        default:
            return state;
    }
}
