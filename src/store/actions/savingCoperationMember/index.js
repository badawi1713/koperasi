import { ApiGetRequest, ApiPostRequest } from '../../../utils/api/koperasi';
import { SET_SAVING_COPERATION_MEMBER } from '../../constants';

export const getSavingCoperationMemberPaymentMethod = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_SAVING_COPERATION_MEMBER,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/systems/metodeBayar/type/2`)
            await dispatch({
                type: SET_SAVING_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    paymentMethodData: response.data.data
                }
            })

        } catch (error) {

            dispatch({
                type: SET_SAVING_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const postSavingCoperationMemberTransfer = () => {
    return async (dispatch, getState) => {
        const { savingCoperationMemberReducer } = getState();
        const { simpananPokok, simpananWajib, simpananSukarela, viaPayment } = savingCoperationMemberReducer;
        const data = {
            simpananPokok, simpananWajib, simpananSukarela, bayarVia: viaPayment
        }
        try {
            await ApiPostRequest(
                `/mobile/koperasi/simpanan`, data
            );

        } catch (err) {
            dispatch({
                type: SET_SAVING_COPERATION_MEMBER,
                payload: {
                    error: true
                },
            });
        }
    }
}

export const getSavingCoperationMemberData = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_SAVING_COPERATION_MEMBER,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/mobile/koperasi/simpanan`)
            await dispatch({
                type: SET_SAVING_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    dataSimpananPokok: response.data.data.simpananPokok,
                    dataSimpananWajib: response.data.data.simpananWajib,
                    dataSimpananSukarela: response.data.data.simpananSukarela,
                    totalSimpanan: response.data.data.totalSimpanan
                }
            })

        } catch (error) {
            dispatch({
                type: SET_SAVING_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}



export const changeSavingCoperationMember = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_SAVING_COPERATION_MEMBER,
            payload: data,
        });
    };
};