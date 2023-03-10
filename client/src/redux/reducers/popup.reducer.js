import { popupConstants } from '../constants';

export function popup(state = {popup:false, type : ''}, action) {
    switch (action.type) {
        case popupConstants.POPUP:
            return {
                model:true, 
                type : action.name
            };
        case popupConstants.OPEN:
            return {
                model:true, 
                type : action.name
            };
        case popupConstants.CLOSE:
            return {};
        default:
            return state
    }
}