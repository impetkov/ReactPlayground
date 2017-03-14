import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(actionType){
    return actionType.substring(actionType.length - 8) == "_SUCCESS";
}

function actionTypeEndsInError(actionType){
    return actionType.substring(actionType.length - 6) == "_ERROR";
}

export default function ajaxStatusReducer(state = initialState.numberOfAjaxCallsInProgress, action) {
    if (action.type == types.BEGIN_AJAX_CALL) {
        return state + 1;
    }
    else if (actionTypeEndsInSuccess(action.type) || actionTypeEndsInError(action.type)) {
        return state - 1;
    }   

    return state;
}