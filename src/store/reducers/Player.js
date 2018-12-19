import { ADD_PLAYER, EDIT_PLAYER, DELETE_PLAYER } from "../actionTypes";
import { updateObject } from '../utility/updateObject';

const initialState = {
    addPlayerErrors: [],
    addPlayerResult: null,

    editPlayerErrors: [],
    editPlayerResult: null,

    deletePlayerErrors: [],
    deletePlayerResult: null
}

const Player = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
            return updateObject(state, {addPlayerErrors: action.addPlayerErrors,
                addPlayerResult: action.addPlayerResult});
        case EDIT_PLAYER: 
            return updateObject(state, {editPlayerErrors: action.editPlayerErrors,
                editPlayerResult: action.editPlayerResult});
        case DELETE_PLAYER:
            return updateObject(state, {deletePlayerErrors: action.deletePlayerErrors,
                deletePlayerResult: action.deletePlayerResult})
        default:
            break;
    }
    return state;
}
export default Player;