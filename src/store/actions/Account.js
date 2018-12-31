import { REGISTER, EDIT_PROFILE, CHANGE_PASSWORD, GET_ACCOUNT } from '../actionTypes.js';
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
        Api.Authorization.register(registerModel).then(() => dispatch(register(true, "")))
        .catch(errors => dispatch(register(false, errors)))
    }
}

export const editProfile = (editProfileResult, editProfileErrors) => ({
        type: EDIT_PROFILE, editProfileResult, editProfileErrors
    })

export const editProfileActionCreator = (editProfileArray) => {
    return dispatch => {
        const editProfileModel = {
            "Firstname": editProfileArray[0].value,
            "Lastname": editProfileArray[1].value
        }
        Api.Account.editProfile(editProfileModel).then(() => dispatch(editProfile(true, [])))
        .catch(errors => dispatch(editProfile(false,errors)));
    }
}

export const changePassword = (changePasswordResult, changePasswordErrors) => ({
    type: CHANGE_PASSWORD, changePasswordResult, changePasswordErrors
})


export const clearChangePassword = () => dispatch => setTimeout(() => dispatch(changePassword(null, [])),3000);

export const changePasswordActionCreator = (changePasswordArray) => {
    return dispatch => {
        const changePasswordModel = {
            "password": changePasswordArray[0].value,
            "newPassword": changePasswordArray[1].value,
            "confirmNewPassword": changePasswordArray[2].value,
        }
        Api.Account.changePassword(changePasswordModel)
        .then(() => dispatch(changePassword(true, [])))
        .catch(errors =>{dispatch(changePassword(false,errors)) } );
    }
}


export const getAccount = (account, getAccountErrors, getAccountStatus) => {
    return {
        type: GET_ACCOUNT, account, getAccountErrors, getAccountStatus
    }
}

export const getAccountActionCreator = () => {
    return dispatch => {
        Api.Account.getAccount()
            .then(response => {
                console.log("response",response)
                dispatch(getAccount(response.object, [], true))
            })
            .catch(error => {
                dispatch(getAccount({}, error.errors, false))
            });
    }
}


