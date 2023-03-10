import { userConstants } from '../constants';
import { userService } from '../../services';
import { alertActions, popupActions } from './';
import { history } from '../../helpers';

export const userActions = {
    login,
    logout,
    register,
    getById,
    getAll,
    delete: _delete
};

function login(data) {
    return dispatch => {
        dispatch(request({ data }));

        userService.login(data)
            .then(
                response => { 
                   
                    dispatch(success(response.user));
                   // history.push(from);
                    dispatch(alertActions.success(response.msg));
                    dispatch(popupActions.close());
                    history.push("/dashboard");
                },
                error => {
                    dispatch(failure(error.msg));
                    dispatch(alertActions.error(error.msg));
                    //console.log(error);
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        return userService.register(user)
            .then(
                response => { 
                    dispatch(success(response));
                    //history.push('/login');
                    dispatch(alertActions.success(response.msg));
                },
                error => {
                    dispatch(failure(error.msg));
                    dispatch(alertActions.error(error.msg));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(response) { return { type: userConstants.REGISTER_SUCCESS, response } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function getById(id) { 
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                response => dispatch(success(response.user)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: userConstants.PROFILE_REQUEST } }
    function success(users) { return { type: userConstants.PROFILE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.PROFILE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}