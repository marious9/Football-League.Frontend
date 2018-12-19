import { ADD_PLAYER, EDIT_PLAYER, DELETE_PLAYER } from "../actionTypes";
import { Api } from '../../api/index.js';

export const addPlayer = (addPlayerErrors, addPlayerResult) => {
    return {
        type: ADD_PLAYER, addPlayerErrors, addPlayerResult
    }
}

export const editPlayer = (editPlayerErrors, editPlayerResult) => {
    return {
        type: EDIT_PLAYER, editPlayerErrors, editPlayerResult
    }
}

export const deletePlayer = (deletePlayerErrors, deletePlayerResult) => {
    return {
        type: DELETE_PLAYER, deletePlayerErrors, deletePlayerResult
    }
}

export const addPlayerActionCreator = (addPlayerArray, teamId) => {
    const addPlayerModel = {
        "firstname": addPlayerArray[0].value,
        "lastname": addPlayerArray[1].value,
        "birthDate": addPlayerArray[2].value,
    }
    return dispatch => {
        Api.Player.addPlayer(teamId, addPlayerModel)
            .then(() => dispatch(addPlayer([], true)))
            .catch(error => dispatch(addPlayer(error,false)));
    }
}

export const deletePlayerActionCreator = playerId => {
    return dispatch => {
        Api.Player.deletePlayer(playerId)
            .then(() => dispatch(deletePlayer([], true)))
            .catch(error => dispatch(deletePlayer(error, false)));
    }
}

export const editPlayerActionCreator = (editPlayerArray, playerId) => {
    const editPlayerModel = {
        "firstname": editPlayerArray[0].value,
        "lastname": editPlayerArray[1].value,
        "birthDate": editPlayerArray[2].value,
    }
    return dispatch => {
        Api.Player.editPlayer(playerId, editPlayerModel)
            .then(() => dispatch(editPlayer([], true)))
            .catch(error => dispatch(editPlayer(error,false)));
    }
}