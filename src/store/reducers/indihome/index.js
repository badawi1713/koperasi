import { SET_INDIHOME } from '../../constants';

const initialState = {
    detailLoading: false,
    paymentLoading: false,
    showModal: false,
    error: false,
    errorMessage: "",
    customerId: "",
    detailProduk: {}
};

const indihomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INDIHOME:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default indihomeReducer
