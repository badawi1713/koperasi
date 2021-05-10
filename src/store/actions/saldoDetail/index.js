import { Api } from '../../../utils/api/koperasi';
import { SET_SALDO_DETAIL } from '../../constants';

export const getSaldoTransactions = () => {
    return async (dispatch, getState) => {

        const { saldoDetailReducer } = getState()

        const { startDate, endDate } = saldoDetailReducer

        dispatch({
            type: SET_SALDO_DETAIL,
            payload: {
                loading: true
            }
        })


        try {
            const response = await Api.get(`/mobile/profile/mutasi-saldo?start=${startDate}&end=${endDate}`)
            await dispatch({
                type: SET_SALDO_DETAIL,
                payload: {
                    loading: false,
                    allTransactionData: response.data.data
                }
            })

        } catch (error) {
            dispatch({
                type: SET_SALDO_DETAIL,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const changeSaldoDetail = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_SALDO_DETAIL,
            payload: data,
        });
    };
};