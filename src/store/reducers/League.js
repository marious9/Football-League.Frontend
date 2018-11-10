import { GET_LEAGUES } from '../actionTypes.js';
import { updateObject } from '../utility/updateObject';

const initialState = {
    leagues: [],
    getLeaguesErrors: [],
    getLeaguesStatus: null
}

const League = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEAGUES:
            return updateObject(state, { getLeaguesErrors: action.getLeaguesErrors,
            leagues: action.leagues, getLeaguesStatus: action.getLeaguesStatus})
        default:
            break;
    }
    return state;
}
export default League;