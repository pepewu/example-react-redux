import * as actionTypes from '../actions/actionTypes';

const initialState = {
    msgs: []
};

const case_showMsg = (state, msg, id) => {
    let msgs = [...state.msgs];
    msgs.push({
        id: id,
        text: msg
    });

    return {
        ...state,
        msgs: msgs
    }
}

const case_hideMsg = (state, id) => {
    let msgs = [...state.msgs];
    let index = msgs.findIndex(msg => msg.id === id);
    msgs.splice(index, 1);

    return {
        ...state,
        msgs: msgs
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MESSANGER_SHOW_MESSAGE:
            return case_showMsg(state, action.msg, action.id);
        case actionTypes.MESSANGER_HIDE_MESSAGE:
            return case_hideMsg(state, action.id);
        default:
            return state;
    }
}

export default reducer;