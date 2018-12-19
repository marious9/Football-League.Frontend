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
        throw ["Ups, coś poszło nie tak."];
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
        generateSchedule: leagueId => {console.log("wysylam sie"); return dataExtractor("post", "/league/generateSchedule" + leagueId )},
        getStatistics: leagueId => { return dataExtractor("get", "/statistic/league/" + leagueId) },
        addLeague: addLeagueModel => { return dataExtractor("post", "/league", addLeagueModel) },
        getLeagues: () => { return dataExtractor("get", "/league") },
        getLeagueById: leagueId => { return dataExtractor("get", "/league/" + leagueId) },
        getLeagueTable: leagueId => { return dataExtractor("get", "/leaguestatistics/" + leagueId) }
    },
    Match: {
        getMatchById: matchId => { return dataExtractor("get", "/match/" + matchId) },
        getMatches: leagueId => { return dataExtractor("get", "/match/league/" + leagueId) },
        addMatch: (addMatchModel, leagueId) => { return dataExtractor("post", "/match/" + leagueId, addMatchModel) },
        editMatch: (editMatchModel, matchId) => { return dataExtractor("put", "/match/" + matchId, editMatchModel) },
        deleteMatch: matchId => { return dataExtractor("delete", "/match/" + matchId) }
    },
    Team: {
        getTeamById: teamId => { return dataExtractor("get", "/team/" + teamId) },
        addTeam: (addTeamModel, leagueId) => { return dataExtractor("post", "/team/" + leagueId, addTeamModel) },
        editTeam: (editTeamModel, teamId) => { return dataExtractor("put", "/team/" + teamId, editTeamModel) },
        deleteTeam: teamId => { return dataExtractor("delete", "/team/" + teamId) }
    },
    Statistic: {
        getStatisticById: statisticId => { return dataExtractor("get", "/statistic/" + statisticId) },
        getMatchStatistics: matchId => { return dataExtractor("get", "/statistic/match/" + matchId) },
        addStatistic: addStatisticModel => { return dataExtractor("post", "/statistic", addStatisticModel) },
        deleteStatistic: statisticId => { return dataExtractor("delete", "/statistic/" + statisticId ) }
    }

};