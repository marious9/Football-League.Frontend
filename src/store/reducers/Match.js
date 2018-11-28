import { GET_MATCHES, GET_MATCH_BY_ID, ADD_MATCH, EDIT_MATCH, DELETE_MATCH } from '../actionTypes.js';
import { updateObject } from '../utility/updateObject';
import { editMatch } from '../actions/Match.js';

const initialState = {
    matches: [],
    getMatchesErrors: [],
    getMatchesStatus: null,

    match: {},
    getMatchErrors: [],
    getMatchStatus: null,

    addMatchErrors: [],
    addMatchResult: null,

    editMatchErrors: [],
    editMatchResult: null,

    deleteMatchErrors: [],
    deleteMatchResult: null
}

const Match = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MATCH:
            return updateObject(state, {addMatchErrors: action.addMatchErrors,
                addMatchResult: action.addMatchResult});
        case GET_MATCHES:
            return updateObject(state, {getMatchesErrors: action.getMatchesErrors,
                getMatchesStatus: action.getMatchesStatus, matches: action.matches});
        case GET_MATCH_BY_ID:
            return updateObject(state, {getMatchErrors: action.getMatchErrors,
                getMatchStatus: action.getMatchStatus, match: action.match});
        case EDIT_MATCH: 
            return updateObject(state, {editMatchErrors: action.editMatchErrors,
                editMatchResult: action.editMatchResult});
        case DELETE_MATCH:
            return updateObject(state, {deleteMatchErrors: action.deleteMatchErrors,
                deleteMatchResult: action.deleteMatchResult})
        default:
            break;
    }
    return state;
}
export default Match;