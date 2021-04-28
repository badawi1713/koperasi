import { SET_SALDO_DETAIL } from '../../constants';
import moment from 'moment'

const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    startDate: moment(firstDay).format("YYYY-MM-DD"),
    endDate: moment(lastDay).format("YYYY-MM-DD"),
    allTransactionData: []
};

const saldoDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SALDO_DETAIL:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default saldoDetailReducer;
