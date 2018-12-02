import { ADD_TEAM, EDIT_TEAM, DELETE_TEAM, GET_TEAM_BY_ID } from '../actionTypes';
import { Api } from '../../api/index.js';

export const getTeamById = (team, getTeamErrors, getTeamStatus) => {
    return {
        type: GET_TEAM_BY_ID, team, getTeamErrors, getTeamStatus
    }
}

export const addTeam = (addTeamErrors, addTeamResult) => {
    return {
        type: ADD_TEAM, addTeamErrors, addTeamResult
    }
}

export const editTeam = (editTeamErrors, editTeamResult) => {
    return {
        type: EDIT_TEAM, editTeamErrors, editTeamResult
    }
}

export const deleteTeam = (deleteTeamErrors, deleteTeamResult) => {
    return {
        type: ADD_TEAM, deleteTeamErrors, deleteTeamResult
    }
}

export const getTeamByIdActionCreator = teamId => {
    return dispatch => {
        Api.Team.getTeamById(teamId)
            .then(response => {
                dispatch(getTeamById(response.object, [], true))
            })
            .catch(error => {
                dispatch(getTeamById([], error.errors, false))
            });
    }
}

export const addTeamActionCreator = (addTeamArray, leagueId) => {
    const addTeamModel = {
        "Name": addTeamArray[0].value,
    }
    return dispatch => {
        Api.Team.addTeam(addTeamModel, leagueId)
            .then(() => dispatch(addTeam([], true)))
            .catch(errors => dispatch(addTeam(errors,false)));
    }
}

export const editTeamActionCreator = (editTeamArray, teamId) => {
    const editTeamModel = {
        "Name": editTeamArray[0].value,
    }
    return dispatch => {
        Api.Team.editTeam(editTeamModel, teamId)
            .then(() => dispatch(editTeam([], true)))
            .catch(errors => dispatch(editTeam(errors,false)));
    }
}

export const deleteTeamActionCreator = teamId => {    
    return dispatch => {
        Api.Team.deleteTeam(teamId)
            .then(() => dispatch(deleteTeam([], true)))
            .catch(errors => dispatch(deleteTeam(errors,false)));
    }
}