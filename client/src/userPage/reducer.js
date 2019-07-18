import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_USER } from "./actionTypes";

const initialState = {
    userData: {
        name: '',
        avatar: '',
        email: '',
        password: ''
    },
    loading: false,
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_SUCCESS: {
            const { userData } = action.payload;
            return {
                ...state,
                userData,
                loading: false,
            };
        }

        case FETCH_USER_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        case FETCH_USER: {
            return {
                ...state, 
                loading: true
            }
        }

        default:
            return state;
    }
}
