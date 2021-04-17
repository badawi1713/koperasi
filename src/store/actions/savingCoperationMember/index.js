import { Api, ApiGetRequest } from '../../../utils/api/koperasi';
import { SET_SAVING_COPERATION_MEMBER } from '../../constants';
import { navigate, replace } from '../../../helpers/RootNavigation'
import { Alert } from "react-native";

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
            const response = await Api.post(
                `/mobile/koperasi/simpanan`, data
            );

            await replace('CoperationMemberSavingPayment')
            dispatch({
                type: SET_SAVING_COPERATION_MEMBER,
                payload: {
                    timeLimit: response.data.data.batasBayar
                },
            });

        } catch (err) {
            console.log("error", err.response.data.rd)
            Alert.alert(
                "Setor Simpanan Gagal",
                err.response.data.rd,
                [
                    {
                        text: "OK",
                        onPress: () => replace("CoperationMemberSaving"),
                        style: "cancel",
                    },
                ],

            );
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