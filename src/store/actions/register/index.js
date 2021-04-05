import { replace } from '../../../helpers/RootNavigation';
import { ApiGetRequest, ApiPostRequest } from '../../../utils/api/koperasi';
import { SET_REGISTER } from '../../constants';
import { Alert } from "react-native";

export const postOTP = (code) => {
    return async (dispatch, getState) => {
        const { registerReducer } = getState();
        const { password, phoneNumber } = registerReducer;
        await dispatch({
            type: SET_REGISTER,
            payload: {
                loading: false,
                error: false,
                errorMessage: ""
            },
        });
        const data = {
            "noHp": phoneNumber,
            "otp": code,
            "password": password
        }
        try {
            const response = await ApiPostRequest(
                `/mobile/register/otp`, data
            );

            if (response.error) {
                await dispatch({
                    type: SET_REGISTER,
                    payload: {
                        loading: false,
                        error: true,
                        errorMessage: "Maaf, kode OTP salah, silakan coba kembali",
                        codeText: []
                    },
                });

            } else {
                await dispatch({
                    type: SET_REGISTER,
                    payload: {
                        fullName: "",
                        phoneNumber: "",
                        email: "",
                        password: "",
                        passwordConfirm: "",
                        loading: false,
                        error: false,
                        errorMessage: "",
                        codeText: []
                    },
                });

                setTimeout(() => {
                    replace("Login")
                }, 3000)

            }


        } catch (err) {
            dispatch({
                type: SET_REGISTER,
                payload: {
                    error: true,
                    errorMessage: "",
                    codeText: []
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
            const response = await ApiPostRequest(
                `/mobile/register`, data
            );

            if (response.error) {
                dispatch({
                    type: SET_REGISTER,
                    payload: {
                        loading: false,
                        error: true,
                        errorMessage: response.error
                    },
                });
                Alert.alert(
                    "Terjadi Kesalahan",
                    response.error,
                    [
                        {
                            text: "Tutup",
                            style: "cancel",
                        },
                    ],

                );
            } else {
                dispatch({
                    type: SET_REGISTER,
                    payload: {
                        loading: false,
                        error: false,
                        errorMessage: ""

                    },
                });

                await ApiGetRequest(`/mobile/register/sendOtp/${phoneNumber}`)

                await replace("RegisterVerification");
            }
        } catch (error) {
            dispatch({
                type: SET_REGISTER,
                payload: {
                    loading: false,
                    error: true,
                    errorMessage: ""
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