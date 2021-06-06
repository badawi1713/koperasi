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

export const postRegistrationPayment = () => {
    return async (dispatch, getState) => {
        const { savingCoperationMemberReducer } = getState();
        const { viaPayment } = savingCoperationMemberReducer;
        
        const data = {
            bayarVia: viaPayment
        }

        try {
            const response = await Api.post(
                `/mobile/koperasi/register/payment`, data
            );

            await replace('CoperationMemberSavingPayment')
            dispatch({
                type: SET_SAVING_COPERATION_MEMBER,
                payload: {
                    caraBayar: response.data.data.caraBayar,
                    kodeBayar: response.data.data.kodeBayar,
                    timeLimit: response.data.data.batasBayar
                },
            });

        } catch (err) {
            console.log("error", err.response.data.rd)
            Alert.alert(
                "Bayar Pendaftaran Koperasi Gagal",
                err.response.data.rd,
                [
                    {
                        text: "OK",
                        onPress: () => replace("CoperationMember"),
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

export const getCoperationRegistrationHistory = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_SAVING_COPERATION_MEMBER,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`mobile/koperasi/register/payment`)
            await dispatch({
                type: SET_SAVING_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    paymentRegistration: response.data.data
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