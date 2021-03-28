import { ApiGetRequest, ApiPostRequest } from '../../../utils/api/koperasi';
import { SET_TOPUP } from '../../constants';

export const postTopUpRequest = () => {
    return async (dispatch, getState) => {
        const { topUpReducer } = getState();

        const data = {
            via: topUpReducer.via,
            nominal: topUpReducer.saldoNominal,
            jenisTransaksi: topUpReducer.transactionType,
            appVia: topUpReducer.appVia
        }

        dispatch({
            type: SET_TOPUP,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiPostRequest(`/mobile/topup`, data)
            await dispatch({
                type: SET_TOPUP,
                payload: {
                    loading: false,
                }
            })
        } catch (error) {
            await dispatch({
                type: SET_TOPUP,
                payload: {
                    loading: false,
                }
            })
        }
    }
}

export const getTopUpMethod = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_TOPUP,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/systems/metodeBayar/type/2`)
            await dispatch({
                type: SET_TOPUP,
                payload: {
                    loading: false,
                    paymentMethodData: response.data.data
                }
            })

        } catch (error) {

            dispatch({
                type: SET_TOPUP,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const changeTopUp = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_TOPUP,
            payload: data,
        });
    };
};