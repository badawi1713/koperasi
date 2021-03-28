import { SET_MISC } from "../../constants";

export const changeMisc = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_MISC,
            payload: data,
        });
    };
}