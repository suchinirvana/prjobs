import { employerConstants } from '../constants';
import { employerService } from '../../services';


export const employerActions = {
    getById,
    getAll
};

function getById(id) { 
    return dispatch => {
        dispatch(request());

        return  employerService.getById(id)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: employerConstants.EMP_DETAIL_REQUEST } }
    function success(payload) { return { type: employerConstants.EMP_DETAIL_SUCCESS, payload } }
    function failure(error) { return { type: employerConstants.EMP_DETAIL_FAILURE, error } }
}

function getAll(cid) {
    return dispatch => {
        dispatch(request());

        return employerService.getAll(cid)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.msg))
            );
    };

    function request() { return { type: employerConstants.EMP_GETALL_REQUEST } }
    function success(payload) { return { type: employerConstants.EMP_GETALL_SUCCESS, payload } }
    function failure(error) { return { type: employerConstants.EMP_GETALL_FAILURE, error } }
}

