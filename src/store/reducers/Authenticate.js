import { LOGIN } from '../actionTypes';
import { updateObject } from '../utility/updateObject';

const initialState = {
    loginResult: null,
    loginErrors: []
}

const Authenticate = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return updateObject(state, {loginResult: action.loginResult, loginErrors: action.loginErrors})
        default:
            break;
    }
    return state;   
}
export default Authenticate;