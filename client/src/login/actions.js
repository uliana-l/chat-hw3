import { CHECK_DATA, CLEAR } from './actionTypes';

export const checkData = data => ({
    type: CHECK_DATA,
    payload: data
});
export const clear = () => ({
    type: CLEAR
})