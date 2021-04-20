import { SET_STORE_PRODUCT } from "../../constants";

export const changeStoreProduct = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_STORE_PRODUCT,
            payload: data,
        });
    };
}