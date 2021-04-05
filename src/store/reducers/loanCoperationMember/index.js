import { SET_LOAN_COPERATION_MEMBER } from '../../constants';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    loanAmount: 0,
    month: 0,
    loanHistory: [],
    data: {},
    viaPayment: "",
    paymentMethodData: []
};

const loanCoperationMemberReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOAN_COPERATION_MEMBER:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default loanCoperationMemberReducer
