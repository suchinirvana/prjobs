import { popupConstants } from '../constants';

export const popupActions = {
    popup,
    open,
    close
};

function popup(name) {
    return { type: popupConstants.POPUP, name };
}

function open(name) {
    return { type: popupConstants.OPEN, name };
}
function close() {
    return { type: popupConstants.CLOSE };
}
