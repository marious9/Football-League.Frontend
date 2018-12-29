import { GET_STATISTICS, GET_LEAGUES, GET_LEAGUE_BY_ID, GET_LEAGUE_TABLE, ADD_LEAGUE, EDIT_LEAGUE, GENERATE_SCHEDULE, DELETE_LEAGUE } from '../actionTypes.js';
import { updateObject } from '../utility/updateObject';

const initialState = {
    generateScheduleResult: null,
    generateScheduleErrors: [],

    leagues: [],
    getLeaguesErrors: [],
    getLeaguesStatus: null,

    league: {},
    getLeagueErrors: [],
    getLeagueStatus: null,

    leagueTable: {},
    getLeagueTableErrors: [],
    getLeagueTableStatus: null,
    
    addLeagueErrors: [],
    addLeagueResult: null,

    deleteLeagueErrors: [],
    deleteLeagueResult: null,
    
    editLeagueErrors: [],
    editLeagueResult: null,

    statistics: [],
    getStatisticsErrors: [],
    getStatisticsStatus: null
}

const League = (state = initialState, action) => {
    switch (action.type) {
        case GENERATE_SCHEDULE: 
            return updateObject(state, {generateScheduleResult: action.generateScheduleResult,
                generateScheduleErrors: action.generateScheduleErrors})
        case GET_STATISTICS:
            return updateObject(state, {getStatisticsErrors: action.getStatisticsErrors,
                getStatisticsStatus: action.getStatisticsStatus, statistics: action.statistics});
        case ADD_LEAGUE:
            return updateObject(state, {addLeagueErrors: action.addLeagueErrors,
                addLeagueResult: action.addLeagueResult});
        case DELETE_LEAGUE:
            return updateObject(state, {deleteLeagueErrors: action.deleteLeagueErrors, 
                deleteLeagueResult: action.deleteLeagueResult});
        case EDIT_LEAGUE:
            return updateObject(state, {editLeagueErrors: action.editLeagueErrors,
                editLeagueResult: action.editLeagueResult});
        case GET_LEAGUES:
            return updateObject(state, { getLeaguesErrors: action.getLeaguesErrors,
                leagues: action.leagues, getLeaguesStatus: action.getLeaguesStatus});
        case GET_LEAGUE_BY_ID:
            return updateObject(state, {getLeagueErrors: action.getLeagueErrors,
                league: action.league, getLeagueStatus: action.getLeagueStatus});
        case GET_LEAGUE_TABLE:
            return updateObject(state, {getLeagueTableErrors: action.getLeagueTableErrors,
                leagueTable: action.leagueTable, getLeagueTableStatus: action.getLeagueTableStatus});
        default:
            break;
    }
    return state;
}
export default League;