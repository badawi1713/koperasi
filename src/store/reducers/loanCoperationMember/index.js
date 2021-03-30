import { SET_LOAN_COPERATION_MEMBER } from '../../constants';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    dataSimpananPokok: 0,
    dataSimpananWajib: 0,
    dataSimpananSukarela: 0,
    simpananPokok: "",
    simpananWajib: "",
    simpananSukarela: "",
    totalSimpanan: 0,
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
