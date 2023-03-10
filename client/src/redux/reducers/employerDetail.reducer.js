import { employerConstants } from "../constants";

export function employerDetail(state = { }, action) {
  switch (action.type) {
    case employerConstants.EMP_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case employerConstants.EMP_DETAIL_SUCCESS:
      return {
        detail: action.payload,
        loading: false,
      };
    case employerConstants.EMP_DETAIL_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    case employerConstants.EMP_GETALL_REQUEST:
      return {
        loading: true,
      };
    case employerConstants.EMP_GETALL_SUCCESS:
      return {
        detail: action.payload,
        loading: false,
      };
    case employerConstants.EMP_GETALL_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
