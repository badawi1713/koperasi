import { SET_PRODUCT } from "../../constants";

export const changeProduct = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PRODUCT,
            payload: data,
        });
    };
}