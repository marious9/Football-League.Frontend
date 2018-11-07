import { REGISTER } from '../actionTypes';
import { updateObject } from '../utility/updateObject';


const initialState = {
    registerResult: null, 
    registerError: []
}

const Account = (state = initialState, action) => {
    switch(action.type){
        case REGISTER:
            return updateObject(state, {registerResult: action.registerResult, 
                registerError: action.registerError, registerUserData: action.registerUserData})
        default:
            break;
    }
    return state;   
}
export default Account;