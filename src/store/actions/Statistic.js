import {ADD_STATISTIC, EDIT_STATISTIC, DELETE_STATISTIC, GET_STATISTIC_BY_ID, GET_MATCH_STATISTICS} from '../actionTypes';
import { Api } from '../../api/index.js';

export const getMatchStatistics = (matchStatistics, getMatchStatisticsErrors, getMatchStatisticsStatus) => {
    return {
        type: GET_MATCH_STATISTICS, matchStatistics, getMatchStatisticsErrors, getMatchStatisticsStatus
    }
}

export const getStatisticById = (statistic, getStatisticErrors, getStatisticStatus) => {
    return {
        type: GET_STATISTIC_BY_ID, statistic, getStatisticErrors, getStatisticStatus
    }
}

export const addStatistic = (addStatisticErrors, addStatisticResult) => {
    return {
        type: ADD_STATISTIC, addStatisticErrors, addStatisticResult
    }
}

export const editStatistic = (editStatisticErrors, editStatisticResult) => {
    return {
        type: EDIT_STATISTIC, editStatisticErrors, editStatisticResult
    }
}

export const deleteStatistic = (deleteStatisticErrors, deleteStatisticResult) => {
    return {
        type: DELETE_STATISTIC, deleteStatisticErrors, deleteStatisticResult
    }
}

export const getMatchStatisticsActionCreator = matchId => {
    return dispatch => {
        Api.Statistic.getMatchStatistics(matchId)
            .then(response => {
                dispatch(getMatchStatistics(response.object.statistics, [], true))
            })
            .catch(error => {
                dispatch(getMatchStatistics([], error.errors, false))
            });
    }
}

export const getStatisticByIdActionCreator = statisticId => {
    return dispatch => {
        Api.Statistic.getStatisticById(statisticId)
            .then(response => {
                dispatch(getStatisticById(response.object, [], true))
            })
            .catch(error => {
                dispatch(getStatisticById([], error.errors, false))
            });
    }
}

export const addStatisticActionCreator = (addStatisticArray, addStatisticIds) => {
    const addStatisticModel = {
        "minute": addStatisticArray[0].value,
        "action": addStatisticArray[1].value,
        "playerId": addStatisticIds.playerId,
        "matchId": addStatisticIds.matchId,
    }
    return dispatch => {
        Api.Statistic.addStatistic(addStatisticModel)
            .then(() => dispatch(addStatistic([], true)))
            .catch(error => dispatch(addStatistic(error,false)));
    }
}

export const deleteStatisticActionCreator = statisticId => {
    return dispatch => {
        Api.Statistic.deleteStatistic(statisticId)
            .then(() => dispatch(deleteStatistic([], true)))
            .catch(error => dispatch(deleteStatistic(error, false)));
    }
}