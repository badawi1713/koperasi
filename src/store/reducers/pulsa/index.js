import { SET_PULSA } from '../../constants';

const initialState = {
    loading: false,
    detailLoading: false,
    paymentLoading: false,
    showSuccessModal: false,
    error: false,
    errorMessage: "",
    nomorTelepon: "",
    produkId: "",
    daftarPulsa: [],
    daftarKuota: [],
    detailPulsa: {},
    detailKuota: {}
};

const pulsaReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PULSA:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default pulsaReducer
