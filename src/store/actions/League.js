import { GET_STATISTICS, GET_LEAGUES, GET_LEAGUE_BY_ID, GET_LEAGUE_TABLE, ADD_LEAGUE } from '../actionTypes.js';
import { Api } from '../../api/index.js';

export const getStatistics = (statistics, getStatisticsErrors, getStatisticsStatus) => {
    return {
        type: GET_STATISTICS, statistics, getStatisticsErrors, getStatisticsStatus
    }
}

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

export const getLeagueTable = (leagueTable, getLeagueTableErrors, getLeagueTableStatus) => {
    return {
        type: GET_LEAGUE_TABLE, leagueTable, getLeagueTableErrors, getLeagueTableStatus 
    }
}

export const addLeague = (addLeagueResult, addLeagueErrors) => {
    return {
        type: ADD_LEAGUE, addLeagueResult, addLeagueErrors
    }
}

export const getStatisticsActionCreator = leagueId => {
    return dispatch => {
        Api.League.getStatistics(leagueId)
            .then(response => {
                dispatch(getStatistics(response.object.players, [], true))
            })
            .catch(error => {
                dispatch(getStatistics([], error.errors, false))
            });
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

export const getLeagueTableActionCreator = leagueId => {
    return dispatch => {
        Api.League.getLeagueTable(leagueId)
            .then(response => {
                dispatch(getLeagueTable(response.object.teams, [], true) )
            })
            .catch(error => {
                dispatch(getLeagueTable([], error.errors, false))
            });
    }
}

export const addLeagueActionCreator = (addLeagueArray) => {
    const addLeagueModel = {
        "Name": addLeagueArray[0].value,
        "Quantity": addLeagueArray[1].value
    }
    return dispatch => {
        Api.League.addLeague(addLeagueModel)
            .then(() => dispatch(addLeague(true, [])))
            .catch(errors => dispatch(addLeague(false,errors)));
    }
}