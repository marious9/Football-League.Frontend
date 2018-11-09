import axios from "axios";
import { handleErrors } from '../store/utility/handleErrors';
import { history } from '../index';
import storeCreator from '../store/index';
import { logoutActionCreator } from '../store/actions/Authenticate';
import { Cookies } from 'react-cookie';

const { store } = storeCreator;
const endPoint = "http://localhost:54615";

const instance = axios.create({
    baseURL: endPoint,
    headers: {"Content-Type": "application/json"},  
});

const dataExtractor = (requestType, path, payload) => {
    return instance[requestType](endPoint + path, payload)
        .then(response => {
            succParser(response);
            console.log(response);
    })
        .catch(error => errorParser(error));
}

const succParser = response => {
    if(response.data.successResult){
        return response.data.successResult;
    }
    if(response.data){
        return response.data;
    }  
}

const errorParser = error => {
    if(error.response === undefined){
        throw ["Ups, coś poszło nie tak"];
    }
    const errors = handleErrors(error);
    if(error.response.status === 401){
        store.dispatch(logoutActionCreator(history, "/login"));
    }

    throw errors;
}

export const Api = {
    Authorization: {
        login: loginModel => {console.log(loginModel); return dataExtractor("post", "/account/login/", loginModel) },
        register: registerModel => { return dataExtractor("post", "/account/register/", registerModel) }
    },
};