import * as actionType from './types';
const initialState = { isLogedIn: false, user: null }

//reducer
export default function rootReducer(state=initialState,action) {
    const { type, payload } = action;
    switch (type) {
        case actionType.REGISTER_SUCCESS:
            return{
                ...state,
                isLogedIn: false
            }

        case actionType.REGISTER_FAIL:
            return{
                ...state,
                isLogedIn: false
            } 

        case actionType.LOGIN_SUCCESS:
            return{
                ...state,
                isLogedIn: true,
                user: payload.user
            }

        case actionType.LOGIN_FAIL:
            return{
                ...state,
                isLogedIn: false,
                user: null
            }

        case actionType.LOGOUT:
            return{
                ...state,
                isLogedIn: false,
                user: null
            } 
            
        default:
            return state;
    }
}