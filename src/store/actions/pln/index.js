import { navigate } from '../../../helpers/RootNavigation';
import { Api } from '../../../utils/api/koperasi';
import { SET_PLN } from "../../constants";

export const getPlnMenu = () => {
    return async (dispatch) => {

        dispatch({
            type: SET_PLN,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/group/PLN`)
            await dispatch({
                type: SET_PLN,

                payload: {
                    loading: false,
                    menuPln: response.data.data
                }
            })
        } catch (error) {
            dispatch({
                type: SET_PLN,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }
    }
}

export const changePln = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PLN,
            payload: data,
        });
    };
}