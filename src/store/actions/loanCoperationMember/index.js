import { Alert } from "react-native";
import * as RootNavigation from '../../../helpers/RootNavigation';
import { ApiGetRequest, Api } from '../../../utils/api/koperasi';
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
            const response = await Api.get(`/mobile/koperasi/pinjamanBayar/${id}`)
            console.log(response.data.data)
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
                    error: true,
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

export const postLoanCalculateTransfer = () => {
    return async (dispatch, getState) => {
        const { loanCoperationMemberReducer } = getState();
        const { loanAmount, month } = loanCoperationMemberReducer;
        const data = {
            nominal: loanAmount, tenor: month
        }

        await dispatch({
            type: SET_LOAN_COPERATION_MEMBER,
            payload: {
                loading: true,
            },
        });

        try {
            const response = await Api.post(
                `/mobile/koperasi/pinjamanSimulasi`, data
            );

            console.log(response.data)

            if (response.data.rc === "00") {
                await Api.post(
                    `/mobile/koperasi/pinjamanApply`, data
                );

                await Alert.alert(
                    "Proses Pinjam Dana Sukses",
                    "Terima kasih, pinjaman akan segera diproses",
                    [
                        {
                            onPress: () => { RootNavigation.navigate("CoperationMemberLoan") },
                            text: "OK",
                        },
                    ],

                );

                await dispatch({
                    type: SET_LOAN_COPERATION_MEMBER,
                    payload: {
                        error: false,
                        loading: false,
                        loanAmount: "",
                        month: ""
                    },
                });
            } else {
                dispatch({
                    type: SET_LOAN_COPERATION_MEMBER,
                    payload: {
                        errorMessage: err.response.data.rd,
                        error: true,
                        loading: false,
                        loanAmount: "",
                        month: ""
                    },
                });
            }

        } catch (err) {
            console.log('nop', err.response.data.rd)
            Alert.alert(
                "Proses Pinjam Dana Gagal",
                err.response.data.rd,
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
        }
    }
}

export const postLoanSaveTransfer = () => {
    return async (dispatch, getState) => {
        const { loanCoperationMemberReducer } = getState();
        const { loanAmount, month } = loanCoperationMemberReducer;
        const data = {
            nominal: loanAmount, tenor: month
        }

        console.log('data loan', data)

        try {
            await Api.post(
                `/mobile/koperasi/pinjamanSimulasi`, data
            );

        } catch (err) {
            console.log('this', err.response.data.rd,)
            dispatch({
                type: SET_LOAN_COPERATION_MEMBER,
                payload: {
                    errorMessage: err.response.data.rd,
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