import { ApiGetRequest, ApiPostMultipart } from '../../../utils/api/koperasi';
import { SET_PROFILE } from '../../constants';

export const getProfile = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_PROFILE,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/mobile/koperasi/profile`)
            await dispatch({
                type: SET_PROFILE,
                payload: {
                    loading: false,
                    transactionHistory: response.data.data.riwayatTransaksi,
                    savingTotal: response.data.data.totalSimpanan,
                    memberStatus: response.data.data.statusAnggota
                }
            })

        } catch (error) {
            dispatch({
                type: SET_PROFILE,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const registerMemberProfile = (data) => {
    console.log('dataqqq', data)
    return async (dispatch,) => {
        dispatch({
            type: SET_PROFILE,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiPostMultipart(
                "/mobile/koperasi/register",
                data
            );

            console.log('response upload', response.error.message)
        } catch (error) {
            console.log("error register", error)
        }
    }
}

export const changeProfile = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PROFILE,
            payload: data,
        });
    };
};