import { SET_PDAM } from '../../constants';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    menuPdam: []
};

const pdamReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PDAM:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default pdamReducer
