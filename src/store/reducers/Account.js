import { REGISTER, EDIT_PROFILE, CHANGE_PASSWORD, GET_ACCOUNT } from '../actionTypes';
import { updateObject } from '../utility/updateObject';


const initialState = {
    registerResult: null, 
    registerError: [],

    editProfileResult: null,
    editProfileErrors: [],

    changePasswordResult: null,
    changePasswordErrors: [],

    account: {},
    getAccountErrors: [],
    getAccountStatus: null


}

const Account = (state = initialState, action) => {
    switch(action.type){
        case REGISTER:
            return updateObject(state, {registerResult: action.registerResult, 
                registerError: action.registerError, registerUserData: action.registerUserData})
        case EDIT_PROFILE:
            return updateObject(state, {editProfileResult: action.editProfileResult,
                editProfileErrors: action.editProfileErrors})
        case CHANGE_PASSWORD:
            return updateObject(state, {changePasswordResult: action.changePasswordResult,
                changePasswordErrors: action.changePasswordErrors})
        case GET_ACCOUNT: 
            return updateObject(state, {account: action.account, getAccountStatus: action.getAccountStatus,
                getAccountErrors: action.getAccountErrors})
        default:
            break;
    }
    return state;   
}
export default Account;