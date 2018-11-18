import axios from "axios";
import { handleErrors } from '../store/utility/handleErrors';
import { history } from '../index';
import storeCreator from '../store/index';
import { logoutActionCreator } from '../store/actions/Authenticate';

const { store } = storeCreator;
const endPoint = "http://localhost:5000";

const instance = axios.create({
    baseURL: endPoint,
    headers: {"Content-Type": "application/json"},  
    withCredentials: true
});

const dataExtractor = (requestType, path, payload) => {
    return instance[requestType](endPoint + path, payload)
        .then(response => succParser(response))
        .catch(error => errorParser(error));
}

const succParser = response => {
    if(response.data){
        return response.data;
    }  
}

const errorParser = error => {
    if(error === undefined){
        throw ["Upsaa, coś poszło nie tak"];
    }
    const errors = handleErrors(error);
    if(error.response.status === 401){
        store.dispatch(logoutActionCreator(history, "/login"));
    }

    throw errors;
}

export const Api = {
    Authorization: {
        login: loginModel => { return dataExtractor("post", "/account/login/", loginModel) },
        logOut: () => { return dataExtractor("post", "/account/logout")},
        register: registerModel => { return dataExtractor("post", "/account/register/", registerModel) }
    },
    League: {
        addLeague: addLeagueModel => { return dataExtractor("post", "/league", addLeagueModel) },
        getLeagues: () => { return dataExtractor("get", "/league") },
        getLeagueById: leagueId => { return dataExtractor("get", "/league/" + leagueId) },
        getLeagueTable: leagueId => { return dataExtractor("get", "/leaguestatistics/" + leagueId) }
    },
    Match: {
        getMatchById: matchId => { return dataExtractor("get", "/match/" + matchId) },
        getMatches: () => { return dataExtractor("get", "/match") },
        addMatch: (addMatchModel,leagueId) => { return dataExtractor("post", "/match/" + leagueId, addMatchModel) }
    }
};