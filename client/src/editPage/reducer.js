import { FETCH_MESSAGE_SUCCESS, FETCH_MESSAGE_FAILURE, FETCH_MESSAGE } from "./actionTypes";

const initialState = {
    message: {},
    loading: false,
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MESSAGE_SUCCESS: {
            const { messageData } = action.payload;
            return {
                ...state,
                loading: false,
                message: {...messageData}
            };
        }

        case FETCH_MESSAGE_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case FETCH_MESSAGE: {
            return {
                ...state,
                loading: true
            }
        }

        default:
            return state;
    }
}

