import axios from "axios";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { replace } from "../../../helpers/RootNavigation";
import jwtDecode from 'jwt-decode';

const showMessage = () => {
    ToastAndroid.show("Sesi login berakhir, silakan login kembali.", ToastAndroid.SHORT);
};

let url = "http://rumahkios.com:8001/api"

export const Api = axios.create({
    baseURL: url,
    mode: 'no-cors',
    credentials: true,
    crossdomain: true,
});

Api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token")

        if (token) {
            if (jwtDecode(token).exp < Date.now() / 1000) {
                await AsyncStorage.removeItem('token')
                await replace('Login')
                await showMessage()
            } else {
                config.headers.Authorization = `Bearer ${token}`
                return config
            }
        }
    },
    async (error) => {
        if (!error.response) {
            console.log('error response', error)
            return Promise.reject(error);
        }

        if (error.response.status === 403) {
            await AsyncStorage.removeItem('token');
            await replace('Login');
        } else {
            return Promise.reject(error);
        }
    }

);

export function ApiGetRequest(url, data = {}) {
    return Api.get(url, {
        params: data,
    })
        .then((response) => response)
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return {
                error: (error.response && error.response.data.rd) || error,
            };
        });
}

export function ApiGetUploadFile(url, data = {}, callbackUpload = () => { }) {
    return Api.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => callbackUpload(event),
    })
        .then((response) => response)
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return {
                error: (error.response && error.response.data.rd) || error,
            };
        });
}

export function ApiPostMultipart(url, data = {}) {
    return Api.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => response)
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return {
                error: (error.response && error.response.data.rd) || error,
            };
        });
}

export const ApiPostRequest = (url, data = {}) => {
    return Api.post(url, data)
        .then((response) => {
            response;
        })
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return {
                error: (error.response && error.response.data.rd) || error,
            };
        });
};

export const ApiPutRequest = (url, data = {}) => {
    return Api.put(url, data)
        .then((response) => response)
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return {
                error: (error.response && error.response.data.rd) || error,
            };
        });
};

export const ApiDeleteRequest = (url, data = {}) => {
    return Api.delete(url, data)
        .then((response) => response)
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return {
                error: (error.response && error.response.data.rd) || error,
            };
        });
};

