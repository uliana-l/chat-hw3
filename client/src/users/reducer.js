import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS } from "./actionTypes";

const initialState = {
    loading: false,
    usersData: [],
    error: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS_SUCCESS: {
            return {
                ...state,
                usersData: [...action.payload.users],
                loading: false
            };
        }

        case FETCH_USERS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case FETCH_USERS: {
            return {
                ...state,
                loading: true
            }
        }

        default:
            return state;
    }
}
