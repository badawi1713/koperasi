import { navigate } from '../../../helpers/RootNavigation';
import { Api } from '../../../utils/api/koperasi';
import { SET_INDIHOME } from "../../constants";

export const postIndhomePayment = () => {
    return async (dispatch, getState) => {
        const { indihomeReducer } = getState()
        const { inquiryId } = indihomeReducer

        dispatch({
            type: SET_INDIHOME,
            payload: {
                paymentLoading: true,
                showModal: true
            }
        })

        const data = {
            inquiryId: inquiryId
        }

        try {
            const response = await Api.post(`/mobile/ppob/paymentTagihan`, data)
            await dispatch({
                type: SET_INDIHOME,

                payload: {
                    paymentLoading: false,
                    showModal: true
                }


            })

            await setTimeout(() => {
                dispatch({
                    type: SET_INDIHOME,
                    payload: {
                        paymentLoading: false,
                        showModal: false
                    }
                })
                navigate("MainApp")
            }, 2000)

            console.log(response.data)
        } catch (error) {
            dispatch({
                type: SET_INDIHOME,
                payload: {
                    paymentLoading: false,
                    error: true,
                    showModal: false

                }
            })
        }

    }
}

export const getIndihomeBill = () => {
    return async (dispatch, getState) => {
        const { indihomeReducer } = getState()
        const { customerId } = indihomeReducer

        dispatch({
            type: SET_INDIHOME,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/ppob/inquiryTagihan/TELKOM?noPel=${customerId}`)
            await dispatch({
                type: SET_INDIHOME,

                payload: {
                    loading: false,
                    detailProduk: response.data.data,
                    inquiryId: response.data.data.inquiryId
                }
            })

            console.log(response.data.data)
        } catch (error) {
            dispatch({
                type: SET_INDIHOME,
                payload: {
                    loading: false,
                    error: true,
                }
            })
        }
    }
}

export const changeIndihome = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_INDIHOME,
            payload: data,
        });
    };
}