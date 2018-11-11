import { GET_LEAGUES, GET_LEAGUE_BY_ID } from '../actionTypes.js';
import { updateObject } from '../utility/updateObject';

const initialState = {
    leagues: [],
    getLeaguesErrors: [],
    getLeaguesStatus: null,

    league: {},
    getLeagueErrors: [],
    getLeagueStatus: null,    
}

const League = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEAGUES:
            return updateObject(state, { getLeaguesErrors: action.getLeaguesErrors,
                leagues: action.leagues, getLeaguesStatus: action.getLeaguesStatus});
        case GET_LEAGUE_BY_ID:
            return updateObject(state, {getLeagueErrors: action.getLeagueErrors,
                league: action.league, getLeagueStatus: action.getLeagueStatus});
        default:
            break;
    }
    return state;
}
export default League;