import { LOGIN } from '../actionTypes.js';
import { Api } from '../../api/index.js';

export const logoutActionCreator = (history, path) => {
    return dispatch => {
        dispatch(logIn(null, [], ""));
        history.push(path);
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

        Api.Authorization.login(loginModel).then(() => {
            dispatch(logIn(true, []));
            history.push("/main");
        }).catch(errors => {
            dispatch(logIn(false, errors, "", ""));
        })
    }
}