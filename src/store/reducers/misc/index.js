import { SET_MISC } from '../../constants';

const initialState = {
    loading: true,
    error: false,
    errorMessage: "",
    showSavingDetail: false,
    showSavingTransfer: false
};

const miscReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MISC:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default miscReducer
