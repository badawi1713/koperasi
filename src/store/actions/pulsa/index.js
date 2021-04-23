import { navigate } from '../../../helpers/RootNavigation';
import { Api } from '../../../utils/api/koperasi';
import { SET_PULSA } from "../../constants";

export const postPulsaPayment = () => {
    return async (dispatch, getState) => {
        const { pulsaReducer } = getState()

        const { detailPulsa } = pulsaReducer


        dispatch({
            type: SET_PULSA,
            payload: {
                paymentLoading: true,
                showSuccessModal: true
            }
        })

        const data = {
            inquiryId: detailPulsa.inquiryId
        }

        try {
            await Api.post(`/mobile/ppob/payment`, data)
            await dispatch({
                type: SET_PULSA,
                payload: {
                    paymentLoading: false,
                    showSuccessModal: true
                }
            })

            await setTimeout(() => {
                dispatch({
                    type: SET_PULSA,
                    payload: {
                        paymentLoading: false,
                        showSuccessModal: false
                    }
                })
                navigate("MainApp")
            }, 2000)
        } catch (error) {
            console.log(error.response.data.rd)
            dispatch({
                type: SET_PULSA,
                payload: {
                    showSuccessModal: false,
                    paymentLoading: false,
                    error: true,
                }
            })
        }
    }
}

export const getProductDetail = () => {
    return async (dispatch, getState) => {
        const { pulsaReducer } = getState()
        const { produkId, nomorTelepon } = pulsaReducer

        dispatch({
            type: SET_PULSA,
            payload: {
                detailLoading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/inquiry/${produkId}?phoneNumber=0${nomorTelepon}`)
            await dispatch({
                type: SET_PULSA,
                payload: {
                    detailLoading: false,
                    detailPulsa: response.data.data,
                }
            })
            console.log('tes', response)
        } catch (error) {
            console.log(error.response.data.rd)
            dispatch({
                type: SET_PULSA,
                payload: {
                    detailLoading: false,
                    error: true,
                }
            })
        }
    }
}

export const getPulsaDataList = () => {
    return async (dispatch, getState) => {
        const { pulsaReducer } = getState()
        const { nomorTelepon } = pulsaReducer
        const trimPhoneNumber = nomorTelepon.substring(0, 3)

        dispatch({
            type: SET_PULSA,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/pulsa/0${trimPhoneNumber}`)
            await dispatch({
                type: SET_PULSA,
                payload: {
                    loading: false,
                    daftarPulsa: response.data.data.pulsa,
                    daftarKuota: response.data.data.paketData
                }
            })
        } catch (error) {
            dispatch({
                type: SET_PULSA,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }
    }
}


export const getInitialPulsaDataList = () => {
    return async (dispatch, getState) => {
        const { profileReducer } = getState()
        const { userProfile: { noTelp } } = profileReducer
        const trimPhoneNumber = noTelp[0] === "0" ? noTelp.substring(1) : noTelp
        trimPhoneNumber.substring(0, 3)

        dispatch({
            type: SET_PULSA,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/pulsa/0${trimPhoneNumber}`)
            await dispatch({
                type: SET_PULSA,
                payload: {
                    loading: false,
                    daftarPulsa: response.data.data.pulsa,
                    daftarKuota: response.data.data.paketData
                }
            })
        } catch (error) {
            dispatch({
                type: SET_PULSA,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }
    }
}

export const changePulsa = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PULSA,
            payload: data,
        });
    };
}