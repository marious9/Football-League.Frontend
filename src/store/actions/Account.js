import { REGISTER } from '../actionTypes.js';
import { Api } from '../../api/index.js';

export const register = (registerResult, registerError) => {
    return {
        type: REGISTER, registerResult, registerError
    };
}
export const sendRegisterEmailActionCreator = (firstArray, secondArray) => {
    return dispatch => {
        const registerModel = {
            "Username": firstArray[0].value,
            "Email": firstArray[1].value,
            "Password": firstArray[2].value,
            "FirstName": secondArray[0].value === "" ? null : secondArray[0].value,
            "LastName": secondArray[1].value === "" ? null : secondArray[1].value,
        }
        Api.Authorization.register(registerModel).then(response => dispatch(register(true, "")))
            .catch(errors => dispatch(register(false, errors)))
    }
}