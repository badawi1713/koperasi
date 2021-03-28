import { SET_TOPUP } from '../../constants';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    paymentMethodData: [],
    saldoNominal: 0,
    transactionType: 5,
    via: "",
    appVia: "MOBILE_KOPERASI"
};

const topUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOPUP:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default topUpReducer
