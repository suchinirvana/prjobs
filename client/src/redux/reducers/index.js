import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { popup } from './popup.reducer';
import { employerDetail } from './employerDetail.reducer';
import { jobs } from './job.reducer';
const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    popup,
    users,
    employerDetail,
    jobs
});

export default rootReducer;