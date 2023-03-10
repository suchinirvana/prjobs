import { jobConstants } from "../constants";

export function jobs(state = { loading: false}, action) {
  switch (action.type) {
    case jobConstants.JOB_CREATE_REQUEST:
      return {
        creating: true,
      };
    case jobConstants.JOB_CREATE_SUCCESS:
      return {
        job: action.payload,
        created: true,
      };
      case jobConstants.JOB_DETAIL_REQUEST:
        return {
          loading: true,
        };  
    case jobConstants.JOB_DETAIL_SUCCESS:
      return {
        job: action.payload,
        loading: false,
      };
    case jobConstants.JOB_DETAIL_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    case jobConstants.JOB_GETALL_REQUEST:
      return {
        loading: true,
      };
    case jobConstants.JOB_GETALL_SUCCESS:
      return {
        job: action.payload,
        loading: false,
      };
    case jobConstants.JOB_GETALL_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
      case jobConstants.JOB_GETALL_BY_USER_REQUEST:
      return {
        loading: true,
      };
    case jobConstants.JOB_GETALL_BY_USER_SUCCESS:
      return {
        job: action.payload,
        loading: false,
      };
    case jobConstants.JOB_GETALL_BY_USER_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

      case jobConstants.JOB_DELETE_REQUEST:
        return {
          deleting: true,
        };
      case jobConstants.JOB_DELETE_SUCCESS:
        return {
          job: state,
          deleting: false,
        };
      case jobConstants.JOB_DELETE_FAILURE:
        return {
          error: action.error,
          loading: false,
        };  

    default:
      return state;
  }
}
