import { GET_STATISTICS, GET_LEAGUES, GET_LEAGUE_BY_ID, GET_LEAGUE_TABLE, ADD_LEAGUE, GENERATE_SCHEDULE, DELETE_LEAGUE, EDIT_LEAGUE } from '../actionTypes.js';
import { Api } from '../../api/index.js';

export const generateSchedule = (generateScheduleResult, generateScheduleErrors) => {
    return {
        type: GENERATE_SCHEDULE, generateScheduleResult, generateScheduleErrors
    }
}

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

export const deleteLeague = (deleteLeagueResult, deleteLeagueErrors) => {
    return {
        type: DELETE_LEAGUE, deleteLeagueResult, deleteLeagueErrors
    }
}

export const editLeague = (editLeagueResult, editLeagueErrors) => {
    return {
        type: EDIT_LEAGUE, editLeagueResult, editLeagueErrors
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

export const deleteLeagueActionCreator = leagueId =>
    dispatch => 
        Api.League.deleteLeague(leagueId)
            .then(() => dispatch(deleteLeague(true, [])))
            .catch(errors => dispatch(deleteLeague(false, errors)));

export const editLeagueActionCreator = (editLeagueArray, leagueId) => {
    const editLeagueModel = {
        "Name": editLeagueArray[0].value
    }
    return dispatch => {
        Api.League.editLeague(editLeagueModel, leagueId)
            .then(() => dispatch(editLeague(true, [])))
            .catch(errors => dispatch(editLeague(false,errors)));
    }
}

export const generateScheduleActionCreator = (leagueId) => dispatch => 
    Api.League.generateSchedule(leagueId)
        .then(() => dispatch(generateSchedule(true,[])))
        .catch(error => dispatch(generateSchedule(false, error)));
                