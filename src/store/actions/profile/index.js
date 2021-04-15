import { Api, ApiGetRequest } from '../../../utils/api/koperasi';
import { SET_PROFILE } from '../../constants';
import { Alert } from "react-native";
import * as RootNavigation from '../../../helpers/RootNavigation';

export const getProfile = () => {
    return async (dispatch) => {
        dispatch({
            type: SET_PROFILE,
            payload: {
                loading: true
            }
        })

        try {
            const response = await ApiGetRequest(`/mobile/koperasi/profile`)
            await dispatch({
                type: SET_PROFILE,
                payload: {
                    loading: false,
                    transactionHistory: response.data.data.riwayatTransaksi,
                    totalSaving: response.data.data.totalSimpanan,
                    memberStatus: response.data.data.statusAnggota
                }
            })

        } catch (error) {
            dispatch({
                type: SET_PROFILE,
                payload: {
                    loading: false,
                    error: true
                }
            })
        }
    }
}

export const registerMemberProfile = (data) => {
    return async (dispatch,) => {
        dispatch({
            type: SET_PROFILE,
            payload: {
                registerLoading: true
            }
        })

        try {

            const response = await Api.post("/mobile/koperasi/register", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            dispatch({
                type: SET_PROFILE,
                payload: {
                    registerLoading: false,
                    memberProfile: {
                        nama: "",
                        ktp: [],
                        noKtp: "",
                        tempatLahir: "", tanggalLahir: "", alamat: ""
                    },
                }
            })

            Alert.alert(
                "Pendaftaran Anggota Koperasi Berhasil",
                "Silakan tutup untuk langkah berikutnya",
                [
                    {
                        onPress: () => { RootNavigation.navigate("CoperationMember") },
                        text: "Tutup",
                        style: "cancel",
                    },
                ],

            );

        } catch (error) {
            Alert.alert(
                "Pendaftaran Anggota Koperasi Gagal",
                error.response.data.rd,
                [
                    {
                        onPress: () => { RootNavigation.navigate("CoperationMember") },
                        text: "Tutup",
                        style: "cancel",
                    },
                ],

            );

            dispatch({
                type: SET_PROFILE,
                payload: {
                    registerLoading: false
                }
            })
        }
    }
}

export const changeProfile = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PROFILE,
            payload: data,
        });
    };
};