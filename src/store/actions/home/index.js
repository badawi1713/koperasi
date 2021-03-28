import { ApiGetRequest } from '../../../utils/api/koperasi';
import { SET_HOME } from '../../constants';

export const getHomeContent = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_HOME,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/mobile/home`)
            await dispatch({
                type: SET_HOME,
                payload: {
                    loading: false,
                    banner: response.data.data.banner,
                    category: response.data.data.category
                }
            })
        } catch (error) {
            dispatch({
                type: SET_HOME,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const getSaldoBalance = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_HOME,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/mobile/profile/saldo`)
            await dispatch({
                type: SET_HOME,
                payload: {
                    loading: false,
                    saldoBalance: response.data.data.saldo
                }
            })

        } catch (error) {
            dispatch({
                type: SET_HOME,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const changeHome = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_HOME,
            payload: data,
        });
    };
};