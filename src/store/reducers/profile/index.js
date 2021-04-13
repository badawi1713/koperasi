import { SET_PROFILE } from '../../constants';

const initialState = {
    loading: true,
    error: false,
    registerLoading: false,
    errorMessage: "",
    userProfile: [],
    memberProfile: {
        nama: "",
        ktp: [],
        noKtp: "",
        tempatLahir: "", tanggalLahir: "", alamat: ""
    },
    transactionHistory: [],
    memberStatus: [],
    totalSaving: []
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default profileReducer
