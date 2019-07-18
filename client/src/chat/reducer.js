import { FETCH_DATA_SUCCESS, FETCH_USER_SUCCESS, FETCH_DATA, FETCH_USER, FETCH_FAILURE } from "./actionTypes";

const initialState = {
    data: [], 
    userData: {},
    loadingData: true,
    loadingUser: false,
    error: '', 
    usersAmount: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_SUCCESS: {
            return {...state,
                loadingData: false,
                data: [...action.payload.data],
                usersAmount: action.payload.usersAmount
             };
        }

        case FETCH_USER_SUCCESS: {
            const { userData } = action.payload;
            return {
                ...state,
                loadingUser: false,
                userData
            };
        }

        case FETCH_DATA: {
            return {
                ...state,
                loadingData: true
            }
        }

        case FETCH_USER: {
            return {
                ...state,
                loadingUser: true
            }
        }

        case FETCH_FAILURE: {
            return {
                ...state,
                error: action.payload
            }
        }

        default:
            return state;
    }
}