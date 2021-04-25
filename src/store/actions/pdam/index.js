import { navigate } from '../../../helpers/RootNavigation';
import { Api } from '../../../utils/api/koperasi';
import { SET_PDAM } from "../../constants";

export const postPdamPayment = () => {
    return async (dispatch, getState) => {
        const { pdamReducer } = getState()

        const { detailProduk } = pdamReducer


        dispatch({
            type: SET_PDAM,
            payload: {
                paymentLoading: true,
                showModal: true
            }
        })

        const data = {
            inquiryId: detailProduk.inquiryId
        }

        try {
            await Api.post(`/mobile/ppob/payment`, data)
            await dispatch({
                type: SET_PDAM,
                payload: {
                    paymentLoading: false,
                    showModal: true
                }
            })

            await setTimeout(() => {
                dispatch({
                    type: SET_PDAM,
                    payload: {
                        paymentLoading: false,
                        showModal: false
                    }
                })
                navigate("MainApp")
            }, 2000)

        } catch (error) {
            console.log(error.response.data.rd)
            dispatch({
                type: SET_PDAM,
                payload: {
                    showModal: false,
                    paymentLoading: false,
                    error: true,
                }
            })
        }
    }
}

export const getPdamBill = () => {
    return async (dispatch, getState) => {
        const { pdamReducer } = getState()
        const { customerId, productId } = pdamReducer

        dispatch({
            type: SET_PDAM,
            payload: {
                detailLoading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/inquiry/${productId}?phoneNumber=${customerId}`)
            await dispatch({
                type: SET_PDAM,

                payload: {
                    detailLoading: false,
                    detailProduk: response.data.data,
                    inquiryId: response.data.data.inquiryId
                }
            })

            console.log(response.data.data)
        } catch (error) {
            console.log(error.response.data.rd)

            dispatch({
                type: SET_PDAM,
                payload: {
                    detailLoading: false,
                    error: true,
                }
            })
        }
    }
}

export const getPdamProducts = () => {
    return async (dispatch, getState) => {
        const { pdamReducer } = getState()
        const { groupId } = pdamReducer

        dispatch({
            type: SET_PDAM,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/product/${groupId}`)
            dispatch({
                type: SET_PDAM,
                payload: {
                    loading: false,
                    products: response.data.data
                }
            })

        } catch (error) {
            dispatch({
                type: SET_PDAM,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }

    }
}

export const getPdamMenu = () => {
    return async (dispatch) => {

        dispatch({
            type: SET_PDAM,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/group/PDAM`)
            await dispatch({
                type: SET_PDAM,

                payload: {
                    loading: false,
                    menuPdam: response.data.data
                }
            })
        } catch (error) {
            dispatch({
                type: SET_PDAM,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }
    }
}

export const changePdam = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PDAM,
            payload: data,
        });
    };
}