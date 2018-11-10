import { LOGIN, LOGOUT } from '../actionTypes';
import { updateObject } from '../utility/updateObject';

const initialState = {
    loginResult: null,
    loginErrors: [],
    logoutResult: null,
    logoutErrors: []
}

const Authenticate = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return updateObject(state, {loginResult: action.loginResult, loginErrors: action.loginErrors})
        case LOGOUT:
            return updateObject(state, {logoutResult: action.logoutResult, logoutErrors: action.logoutErrors})
        default:
            break;
    }
    return state;   
}
export default Authenticate;