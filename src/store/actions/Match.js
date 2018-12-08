import { GET_MATCHES, GET_MATCH_BY_ID, ADD_MATCH, EDIT_MATCH, DELETE_MATCH } from '../actionTypes.js';
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

export const editMatch = (editMatchErrors, editMatchResult) => {
    return {
        type: EDIT_MATCH, editMatchErrors, editMatchResult
    }
}

export const deleteMatch = (deleteMatchErrors ,deleteMatchResult) => {
    return {
        type: DELETE_MATCH, deleteMatchErrors, deleteMatchResult
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

export const editMatchActionCreator = (editMatchArray, matchId) => {
    const editMatchModel = {
        "hostScore": editMatchArray[0].value,
        "awayScore": editMatchArray[1].value,
        "date": editMatchArray[2].value + 'T20:00:00.000',
    }
    console.log(editMatchModel)
    return dispatch => {
        console.log(editMatchModel, matchId);
        Api.Match.editMatch(editMatchModel, matchId)
            .then(() => dispatch(editMatch([], true)))
            .catch(errors => dispatch(editMatch(errors, false)));
    }
}

export const deleteMatchActionCreator = (matchId, history, path) => {
    return dispatch => {
        Api.Match.deleteMatch(matchId)
        .then(() => {
            dispatch(deleteMatch([], true));
            history.push(path);
        })
        .catch(errors => dispatch(deleteMatch(errors, false)));
    }
}