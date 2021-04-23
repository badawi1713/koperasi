import { navigate } from '../../../helpers/RootNavigation';
import { Api } from '../../../utils/api/koperasi';
import { SET_PDAM } from "../../constants";

export const getPdamMenu = () => {
    return async (dispatch) => {

        dispatch({
            type: SET_PDAM,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/group/PDAM`)
            await dispatch({
                type: SET_PDAM,

                payload: {
                    loading: false,
                    menuPdam: response.data.data
                }
            })
        } catch (error) {
            dispatch({
                type: SET_PDAM,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }
    }
}

export const changePdam = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PDAM,
            payload: data,
        });
    };
}