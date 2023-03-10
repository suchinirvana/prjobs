import { jobConstants } from '../constants';
import { jobService } from '../../services';


export const jobActions = {
    addJob,
    updateJob,
    getById,
    getAll,
    deleteJob,
    getAllByUser,
    getFilterJob
    
};

function addJob(data) { 
    return dispatch => {
        dispatch(request());

        return  jobService.addJob(data)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: jobConstants.JOB_CREATE_REQUEST } }
    function success(payload) { return { type: jobConstants.JOB_CREATE_SUCCESS, payload } }
    function failure(error) { return { type: jobConstants.JOB_CREATE_FAILURE, error } }
}

function updateJob(data) { 
    return dispatch => {
        dispatch(request());

        return  jobService.updateJob(data)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: jobConstants.JOB_CREATE_REQUEST } }
    function success(payload) { return { type: jobConstants.JOB_CREATE_SUCCESS, payload } }
    function failure(error) { return { type: jobConstants.JOB_CREATE_FAILURE, error } }
}

function getById(id) { 
    return dispatch => {
        dispatch(request());

        return  jobService.getById(id)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: jobConstants.JOB_DETAIL_REQUEST } }
    function success(payload) { return { type: jobConstants.JOB_DETAIL_SUCCESS, payload } }
    function failure(error) { return { type: jobConstants.JOB_DETAIL_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        return jobService.getAll()
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: jobConstants.JOB_GETALL_REQUEST } }
    function success(payload) { return { type: jobConstants.JOB_GETALL_SUCCESS, payload } }
    function failure(error) { return { type: jobConstants.JOB_GETALL_FAILURE, error } }
}

function getFilterJob(data) {
    return dispatch => {
        dispatch(request());

        return jobService.getFilterJob(data)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: jobConstants.JOB_SERCH_REQUEST } }
    function success(payload) { return { type: jobConstants.JOB_SERCH_SUCCESS, payload } }
    function failure(error) { return { type: jobConstants.JOB_SERCH_FAILURE, error } }
}


function getAllByUser(cid) {
    return dispatch => {
        dispatch(request());

        return jobService.getAllByUser(cid)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: jobConstants.JOB_GETALL_BY_USER_REQUEST } }
    function success(payload) { return { type: jobConstants.JOB_GETALL_BY_USER_SUCCESS, payload } }
    function failure(error) { return { type: jobConstants.JOB_GETALL_BY_USER_FAILURE, error } }
}

function deleteJob(id) {
    return dispatch => {
        dispatch(request());

        return jobService.deleteJob(id)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: jobConstants.JOB_DELETE_REQUEST } }
    function success(payload) { return { type: jobConstants.JOB_DELETE_SUCCESS, payload } }
    function failure(error) { return { type: jobConstants.JOB_DELETE_FAILURE, error } }
}

