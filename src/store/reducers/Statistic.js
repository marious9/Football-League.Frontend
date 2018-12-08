import {ADD_STATISTIC, EDIT_STATISTIC, DELETE_STATISTIC, GET_STATISTIC_BY_ID, GET_MATCH_STATISTICS} from '../actionTypes';
import { updateObject } from '../utility/updateObject';

const initialState = {
    matchStatistics: [],
    getMatchStatisticsErrors: [],
    getMatchStatisticsStatus: null,

    statistic: {},
    getStatisticErrors: [],
    getStatisticStatus: null,

    addStatisticErrors: [],
    addStatisticResult: null,

    editStatisticErrors: [],
    editStatisticResult: null,

    deleteStatisticErrors: [],
    deleteStatisticResult: null
}

const Statistic = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STATISTIC:
            return updateObject(state, {addStatisticErrors: action.addStatisticErrors,
                addStatisticResult: action.addStatisticResult});
        case GET_MATCH_STATISTICS:
            return updateObject(state, {getMatchStatisticsErrors: action.getMatchStatisticsErrors,
                getMatchStatisticsStatus: action.getMatchStatisticsStatus, matchStatistics: action.matchStatistics});
        case GET_STATISTIC_BY_ID:
            return updateObject(state, {getStatisticErrors: action.getStatisticErrors,
                getStatisticStatus: action.getStatisticStatus, statistic: action.statistic});
        case EDIT_STATISTIC: 
            return updateObject(state, {editStatisticErrors: action.editStatisticErrors,
                editStatisticResult: action.editStatisticResult});
        case DELETE_STATISTIC:
            return updateObject(state, {deleteStatisticErrors: action.deleteStatisticErrors,
                deleteStatisticResult: action.deleteStatisticResult})
        default:
            break;
    }
    return state;
}
export default Statistic;