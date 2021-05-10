import { Api } from "../../../utils/api/koperasi";
import { SET_STORE_PRODUCT } from "../../constants";

export const checkStoreProfile = () => {
    return async dispatch => {
        await dispatch({
            type: SET_STORE_PRODUCT,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get('/mobile/toko/profile')

            await dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    loading: false,
                    storeStatus: response.data.data.status,
                    storeData: response.data.data
                }
            })
        } catch (error) {
            await dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const postStoreRegistration = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_STORE_PRODUCT,
            payload: {
                registerLoading: true
            }
        })

        try {
            const response = Api.post(`/mobile/toko/register`, data)
            console.log(response)
            dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    registerLoading: false
                }
            })
        } catch (error) {
            dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    registerLoading: false,
                    error: true
                }
            })
        }
    }
}

export const getProvinceData = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_STORE_PRODUCT,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get('/mobile/toko/provinsi')
            await dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    dataProvinsi: response.data,
                    loading: false
                }
            })
        } catch (error) {
            await dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    error: true,
                    loading: false
                }
            })
        }
    }
}

export const getCityData = () => {
    return async (dispatch, getState) => {

        const { storeProductReducer } = getState();

        const { storeProfile: { provinsi } } = storeProductReducer;

        dispatch({
            type: SET_STORE_PRODUCT,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/toko/kota?provinsiId=${provinsi}`)
            await dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    dataKota: response.data,
                    loading: false
                }
            })
        } catch (error) {
            await dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    error: true,
                    loading: false
                }
            })
        }
    }
}

export const getSubDistrictData = () => {
    return async (dispatch, getState) => {

        const { storeProductReducer } = getState();

        const { storeProfile: { kota } } = storeProductReducer;

        dispatch({
            type: SET_STORE_PRODUCT,
            payload: {
                loading: true
            }
        })

        try {
            const response = await Api.get(`/mobile/toko/kecamatan?kotaId=${kota}`)
            await dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    dataKecamatan: response.data,
                    loading: false
                }
            })
        } catch (error) {
            await dispatch({
                type: SET_STORE_PRODUCT,
                payload: {
                    error: true,
                    loading: false
                }
            })
        }
    }
}

export const changeStoreProduct = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_STORE_PRODUCT,
            payload: data,
        });
    };
}