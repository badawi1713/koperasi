import { navigate } from '../../../helpers/RootNavigation';
import { Api } from '../../../utils/api/koperasi';
import { SET_PLN } from "../../constants";

export const postPlnPayment = () => {
    return async (dispatch, getState) => {
        const { plnReducer } = getState()

        const { detailProduk } = plnReducer


        dispatch({
            type: SET_PLN,
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
                type: SET_PLN,
                payload: {
                    paymentLoading: false,
                    showModal: true
                }
            })

            await setTimeout(() => {
                dispatch({
                    type: SET_PLN,
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
                type: SET_PLN,
                payload: {
                    showModal: false,
                    paymentLoading: false,
                    error: true,
                }
            })
        }
    }
}

export const getPlnBill = () => {
    return async (dispatch, getState) => {
        const { plnReducer } = getState()
        const { customerId, productId } = plnReducer

        dispatch({
            type: SET_PLN,
            payload: {
                detailLoading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/inquiry/${productId}?phoneNumber=${customerId}`)
            await dispatch({
                type: SET_PLN,

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
                type: SET_PLN,
                payload: {
                    detailLoading: false,
                    error: true,
                }
            })
        }
    }
}

export const getPlnProducts = () => {
    return async (dispatch, getState) => {
        const { plnReducer } = getState()
        const { groupId } = plnReducer

        dispatch({
            type: SET_PLN,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/product/${groupId}`)
            dispatch({
                type: SET_PLN,
                payload: {
                    loading: false,
                    products: response.data.data
                }
            })

        } catch (error) {
            dispatch({
                type: SET_PLN,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }

    }
}

export const getPlnMenu = () => {
    return async (dispatch) => {

        dispatch({
            type: SET_PLN,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/group/PLN`)
            await dispatch({
                type: SET_PLN,

                payload: {
                    loading: false,
                    menuPln: response.data.data
                }
            })
        } catch (error) {
            dispatch({
                type: SET_PLN,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }
    }
}

export const changePln = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PLN,
            payload: data,
        });
    };
}