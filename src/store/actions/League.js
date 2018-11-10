import { GET_LEAGUES } from '../actionTypes.js';
import { Api } from '../../api/index.js';

export const getLeagues = (leagues, getLeaguesErrors, getLeaguesStatus) => {
    return {
        type: GET_LEAGUES, leagues, getLeaguesErrors, getLeaguesStatus
    }
}

export const getLeaguesActionCreator = () => {
    return dispatch => {
        Api.League.getLeagues()
            .then(response => {
                dispatch(getLeagues(response.object.leagues, [], true),
                console.log(response));
            })
            .catch(error => {
                dispatch(getLeagues([], error.errors, false))
            });
    }
}