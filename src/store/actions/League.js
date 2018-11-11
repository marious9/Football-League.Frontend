import { GET_LEAGUES, GET_LEAGUE_BY_ID } from '../actionTypes.js';
import { Api } from '../../api/index.js';

export const getLeagues = (leagues, getLeaguesErrors, getLeaguesStatus) => {
    return {
        type: GET_LEAGUES, leagues, getLeaguesErrors, getLeaguesStatus
    }
}

export const getLeagueById = (league, getLeagueErrors, getLeagueStatus) => {
    return {
        type: GET_LEAGUE_BY_ID, league, getLeagueErrors, getLeagueStatus
    }
}

export const getLeaguesActionCreator = () => {
    return dispatch => {
        Api.League.getLeagues()
            .then(response => {
                dispatch(getLeagues(response.object.leagues, [], true))                
            })
            .catch(error => {
                dispatch(getLeagues([], error.errors, false))
            });
    }
}

export const getLeagueByIdActionCreator = leagueId => {
    return dispatch => {
        Api.League.getLeagueById(leagueId)
            .then(response => {
                dispatch(getLeagueById(response.object, [], true))
            })
            .catch(error => {
                dispatch(getLeagueById([], error.errors, false))
            });
    }
}