import { SET_SAVING_COPERATION_MEMBER } from '../../constants';

const initialState = {
    loading: true,
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

const savingCoperationMemberReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SAVING_COPERATION_MEMBER:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default savingCoperationMemberReducer
