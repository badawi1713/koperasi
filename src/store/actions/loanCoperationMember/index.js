import { Alert } from "react-native";
import * as RootNavigation from '../../../helpers/RootNavigation';
import { ApiGetRequest, ApiPostRequest } from '../../../utils/api/koperasi';
import { SET_LOAN_COPERATION_MEMBER } from '../../constants';

export const getInstallmentPaymentData = () => {
    return async (dispatch, getState) => {
        const { loanCoperationMemberReducer } = getState()
        const { id } = loanCoperationMemberReducer
        dispatch({
            type: SET_LOAN_COPERATION_MEMBER,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/mobile/koperasi/pinjamanBayar/${id}`)
            await dispatch({
                type: SET_LOAN_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    installmentPaymentData: response.data.data
                }
            })
        } catch (error) {
            dispatch({
                type: SET_LOAN_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const getLoanCoperationMemberPaymentMethod = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_LOAN_COPERATION_MEMBER,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/systems/metodeBayar/type/2`)
            await dispatch({
                type: SET_LOAN_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    paymentMethodData: response.data.data
                }
            })

        } catch (error) {

            dispatch({
                type: SET_LOAN_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const postLoanCoperationMemberTransfer = () => {
    return async (dispatch, getState) => {
        const { loanCoperationMemberReducer } = getState();
        const { loanAmount, month } = loanCoperationMemberReducer;
        const data = {
            nominal: loanAmount, tenor: month
        }

        try {
            const response = await ApiPostRequest(
                `/mobile/koperasi/pinjamanApply`, data
            );

            if (response.error) {
                Alert.alert(
                    "Proses Pinjam Dana Gagal",
                    response.error,
                    [
                        {
                            text: "Tutup",
                            style: "cancel",
                        },
                    ],

                );
                dispatch({
                    type: SET_LOAN_COPERATION_MEMBER,
                    payload: {
                        error: true,
                        loading: false,
                        loanAmount: "",
                        month: ""
                    },
                });

            } else {
                Alert.alert(
                    "Proses Pinjam Dana Sukses",
                    "Terima kasih, pinjaman akan segera diproses",
                    [
                        {
                            onPress: () => { RootNavigation.navigate("CoperationMemberLoan") },
                            text: "OK",
                            style: "cancel",
                        },
                    ],

                );
                dispatch({
                    type: SET_LOAN_COPERATION_MEMBER,
                    payload: {
                        error: false,
                        loading: false,
                        loanAmount: "",
                        month: ""
                    },
                });
            }

        } catch (err) {
            dispatch({
                type: SET_LOAN_COPERATION_MEMBER,
                payload: {
                    error: true,
                    loading: false,
                    loanAmount: "",
                    month: ""
                },
            });
        }
    }
}

export const getLoanCoperationMemberData = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_LOAN_COPERATION_MEMBER,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/mobile/koperasi/pinjaman`)
            await dispatch({
                type: SET_LOAN_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    loanHistory: response.data.data.pinjamanHistory,
                    data: response.data.data,
                    id: response.data.data.id
                }
            })

        } catch (error) {
            dispatch({
                type: SET_LOAN_COPERATION_MEMBER,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}



export const changeLoanCoperationMember = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_LOAN_COPERATION_MEMBER,
            payload: data,
        });
    };
};