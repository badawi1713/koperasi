import { SET_PLN } from '../../constants';

const initialState = {
    loading: false,
    detailLoading: false,
    paymentLoading: false,
    showModal: false,
    error: false,
    errorMessage: "",
    menuPln: [],
    groupId: "",
    groupName: "",
    customerId: "",
    productId: "",
    products: [],
    detailProduk: {}
};

const plnReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLN:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default plnReducer
