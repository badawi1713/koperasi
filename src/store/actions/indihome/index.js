import { navigate } from '../../../helpers/RootNavigation';
import { Api } from '../../../utils/api/koperasi';
import { SET_INDIHOME } from "../../constants";

export const getIndihomeBill = () => {
    return async (dispatch, getState) => {
        const { indihomeReducer } = getState()
        const { customerId } = indihomeReducer

        dispatch({
            type: SET_INDIHOME,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/inquiryTagihan/TELKOM?noPel=${customerId}`)
            await dispatch({
                type: SET_INDIHOME,

                payload: {
                    loading: false,
                    detailProduk: response.data.data
                }
            })

            console.log(response.data.data)
        } catch (error) {
            dispatch({
                type: SET_INDIHOME,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }
    }
}

export const changeIndihome = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_INDIHOME,
            payload: data,
        });
    };
}