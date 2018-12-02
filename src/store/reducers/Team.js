import { GET_TEAM_BY_ID, ADD_TEAM, EDIT_TEAM, DELETE_TEAM } from '../actionTypes.js';
import { updateObject } from '../utility/updateObject';

const initialState = {
    team: {},
    getTeamErrors: [],
    getTeamStatus: null,

    addTeamErrors: [],
    addTeamResult: null,

    editTeamErrors: [],
    editTeamResult: null,

    deleteTeamErrors: [],
    deleteTeamResult: null
}

const Team = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM:
            return updateObject(state, {addTeamErrors: action.addTeamErrors,
                addTeamResult: action.addTeamResult});
        case GET_TEAM_BY_ID:
            return updateObject(state, {getTeamErrors: action.getTeamErrors,
                getTeamStatus: action.getTeamStatus, team: action.team});
        case EDIT_TEAM: 
            return updateObject(state, {editTeamErrors: action.editTeamErrors,
                editTeamResult: action.editTeamResult});
        case DELETE_TEAM:
            return updateObject(state, {deleteTeamErrors: action.deleteTeamErrors,
                deleteTeamResult: action.deleteTeamResult})
        default:
            break;
    }
    return state;
}
export default Team;