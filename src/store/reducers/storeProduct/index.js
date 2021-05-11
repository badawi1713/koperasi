import { SET_STORE_PRODUCT } from '../../constants';

const initialState = {
    loading: true,
    error: false,
    errorMessage: "",
    storeStatus: "",
    storeData: {},
    dataProvinsi: [],
    dataKota: [],
    dataKecamatan: [],
    storeProfile: {
        namaToko: "",
        provinsi: "",
        kota: "",
        kecamatan: "",
        alamat: "",
        kodePos: "",
    },
    registerLoading: false

};

const storeProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STORE_PRODUCT:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default storeProductReducer
