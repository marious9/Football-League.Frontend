import { LOGIN, LOGOUT } from '../actionTypes.js';
import { Api } from '../../api/index.js';

export const logOut = (logoutResult, logoutErrors) => {
    return {
        type: LOGOUT, logoutResult, logoutErrors
    }
}

export const logIn = (loginResult, loginErrors) => {
    return {
        type: LOGIN, loginResult, loginErrors
    }
}

export const loginActionCreator = (loginArray, history) => {
    return dispatch => {
        const loginModel = {
            "Login": loginArray[0].value,
            "Password": loginArray[1].value
        }

        Api.Authorization.login(loginModel)
        .then(() => {
            dispatch(logIn(true, []));
            history.push("/main");
        }).catch(errors => {
            dispatch(logIn(false, errors, "", ""));
        })
    }
}

export const logoutActionCreator = (history, path) => {
    return dispatch => {
        Api.Authorization.logOut()
            .then(() => {
                dispatch(logOut(true,[]));
                history.push(path);
            }).catch(errors => {
                dispatch(logOut(false, errors, "", ""));
            })
    }
}