import { SET_PRODUCT } from '../../constants';

const initialState = {
    loading: true,
    error: false,
    errorMessage: "",
    newProductData: {
        namaProduk: "",
        kategori: "",
        harga: "",
        berat: "",
        stok: "",
        kondisi: "",
        deskripsi: "",
        gambar: []
    },
    productId: "",
    productName: "",
    harga: "",
    stok: ""
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default productReducer
