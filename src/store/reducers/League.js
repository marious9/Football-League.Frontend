import { GET_LEAGUES, GET_LEAGUE_BY_ID, GET_LEAGUE_TABLE, ADD_LEAGUE } from '../actionTypes.js';
import { updateObject } from '../utility/updateObject';
import { addLeague } from '../actions/League.js';

const initialState = {
    leagues: [],
    getLeaguesErrors: [],
    getLeaguesStatus: null,

    league: {},
    getLeagueErrors: [],
    getLeagueStatus: null,

    leagueTable: {},
    getLeagueTableErrors: [],
    getLeagueTableStatus: null,

    addLeagueResult: null,
    addLeagueErrors: []
}

const League = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LEAGUE:
            return updateObject(state, {addLeagueErrors: action.getLeagueErrors,
                addLeagueResult: action.addLeagueResult});
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