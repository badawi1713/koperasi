import { SET_PLN } from '../../constants';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    menuPln: []
};

const plnReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLN:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default plnReducer
