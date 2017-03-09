import {combineReducers} from 'redux';
import courses from './courseReducers';
import authors from './authorReducers';
import ajaxStatus from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    ajaxStatus
});

export default rootReducer;