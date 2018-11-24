import { GET_MATCHES, GET_MATCH_BY_ID, ADD_MATCH } from '../actionTypes.js';
import { Api } from '../../api/index.js';

export const getMatches = (matches, getMatchesErrors, getMatchesStatus) => {
    return {
        type: GET_MATCHES, matches, getMatchesErrors, getMatchesStatus
    }
}

export const addMatch = (addMatchErrors, addMatchResult) => {
    return {
        type: ADD_MATCH, addMatchErrors, addMatchResult
    }
}

export const getMatchById = (match, getMatchErrors, getMatchStatus) => {
    return {
        type: GET_MATCH_BY_ID, match, getMatchErrors, getMatchStatus
    }
}

export const getMatchesActionCreator = (leagueId) => {
    return dispatch => {
        Api.Match.getMatches(leagueId)
            .then(response => {
                dispatch(getMatches(response.object.matches, [], true))                
            })
            .catch(error => {
                dispatch(getMatches([], error.errors, false))
            });
    }
}

export const getMatchByIdActionCreator = matchId => {
    return dispatch => {
        Api.Match.getMatchById(matchId)
            .then(response => {
                dispatch(getMatchById(response.object, [], true))
            })
            .catch(error => {
                dispatch(getMatchById([], error.errors, false))
            });
    }
}

export const addMatchActionCreator = (addMatchArray, leagueId) => {
    const addMatchModel = {
        "HostId": addMatchArray[0].value,
        "AwayId": addMatchArray[1].value,
        "HostScore": addMatchArray[2].value,
        "AwayScore": addMatchArray[3].value,
        "Round": addMatchArray[4].value,
        "Date": addMatchArray[5].value
    }
    return dispatch => {
        Api.Match.addMatch(addMatchModel, leagueId)
            .then(() => dispatch(addMatch([], true)))
            .catch(errors => dispatch(addMatch(errors,false)));
    }
}