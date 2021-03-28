import { replace } from '../../../helpers/RootNavigation';
import { ApiGetRequest, ApiPostRequest } from '../../../utils/api/koperasi';
import { SET_REGISTER } from '../../constants';

export const postOTP = (code) => {
    return async (dispatch, getState) => {
        const { registerReducer } = getState();
        const { password, phoneNumber } = registerReducer;
        const data = {
            "noHp": phoneNumber,
            "otp": code,
            "password": password
        }
        try {
            await ApiPostRequest(
                `/mobile/register/otp`, data
            );
            await dispatch({
                type: SET_REGISTER,
                payload: {
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    password: "",
                    passwordConfirm: ""
                },
            });

            await replace("Login");
        } catch (err) {
            dispatch({
                type: SET_REGISTER,
                payload: {
                    error: true
                },
            });
        }
    }
}

export const postRegister = () => {
    return async (dispatch, getState) => {
        const { registerReducer } = getState();
        const { fullName, email, password, passwordConfirm, phoneNumber } = registerReducer;
        const data = {
            "nama": fullName,
            "noHp": phoneNumber,
            "email": email,
            "password": password,
            "passwordConf": passwordConfirm
        }
        try {
            await ApiPostRequest(
                `/mobile/register`, data
            );

            await ApiGetRequest(`/mobile/register/sendOtp/${phoneNumber}`)

            await replace("RegisterVerification");
        } catch (error) {
            console.log('register error', error)
            dispatch({
                type: SET_REGISTER,
                payload: {
                    error: true
                },
            });
        }
    }

}

export const changeRegister = (data) => {

    return async (dispatch) => {
        dispatch({
            type: SET_REGISTER,
            payload: data,
        });
    };
};