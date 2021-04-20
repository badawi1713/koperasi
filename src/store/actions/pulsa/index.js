import { Api } from '../../../utils/api/koperasi';
import { SET_PULSA } from "../../constants";

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
            console.log('r', response.data.data)
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