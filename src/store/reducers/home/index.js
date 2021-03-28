import { SET_HOME } from '../../constants';

const initialState = {
    loading: true,
    error: false,
    errorMessage: "",
    saldoBalance: [],
    banner: [],
    category: []
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HOME:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default homeReducer
