import { SET_PULSA } from '../../constants';

const initialState = {
    loading: true,
    error: false,
    errorMessage: "",
    nomorTelepon: "",
    daftarPulsa: [],
    daftarKuota: []
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
