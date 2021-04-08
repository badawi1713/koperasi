import { Alert } from "react-native";
import { replace } from '../../../helpers/RootNavigation';
import { Api, ApiGetRequest } from '../../../utils/api/koperasi';
import { SET_REGISTER } from '../../constants';

export const getOTP = () => {
    return async (dispatch, getState) => {
        const { registerReducer } = getState();
        const { phoneNumber } = registerReducer;

        try {
            await ApiGetRequest(`/mobile/register/sendOtp/${phoneNumber}`)

        } catch (error) {
            console.log(error);
            dispatch({
                type: SET_REGISTER,
                payload: {
                    loading: false,
                    error: true,
                    errorMessage: error.response.data.rd,
                },
            });
        }
    }
}

export const postOTP = (code) => {
    return async (dispatch, getState) => {
        const { registerReducer } = getState();
        const { password, phoneNumber, fullName, email } = registerReducer;
        await dispatch({
            type: SET_REGISTER,
            payload: {
                loading: false,
                error: false,
                errorMessage: ""
            },
        });
        const data = {
            "nama": fullName,
            "noHp": phoneNumber,
            "email": email,
            "password": password,
            "noHp": phoneNumber,
            "otp": code,
        }

        console.log(data)
        try {
            await Api.post(
                `/mobile/register/otp`, data
            );

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
            }, 2000)


        } catch (err) {
            await dispatch({
                type: SET_REGISTER,
                payload: {
                    loading: false,
                    error: true,
                    errorMessage: "Maaf, kode OTP salah, silakan coba kembali",
                    codeText: []
                },
            });
            console.log(err.response.data.rd)
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
            await Api.post(
                `/mobile/register`, data
            );

            await dispatch({
                type: SET_REGISTER,
                payload: {
                    loading: false,
                    error: false,
                    errorMessage: ""

                },
            });

            await ApiGetRequest(`/mobile/register/sendOtp`)

            await replace("RegisterVerification");
        } catch (error) {
            dispatch({
                type: SET_REGISTER,
                payload: {
                    loading: false,
                    error: true,
                    errorMessage: error.response.data.rd,
                },
            });
            Alert.alert(
                "Proses Registrasi Gagal",
                error.response.data.rd,
                [
                    {
                        text: "Tutup",
                        style: "cancel",
                    },
                ],

            );

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