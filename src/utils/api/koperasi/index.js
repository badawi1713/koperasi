import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

let url = "http://rumahkios.com:8001/api"

const Api = axios.create({
    baseURL: url,
    mode: 'no-cors',
    credentials: true,
    crossdomain: true,
});

Api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
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
                error: (error.response && error.response.data.message) || error,
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
                error: (error.response && error.response.data.message) || error,
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
                error: (error.response && error.response.data.message) || error,
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
            return {
                error: (error.response && error.response.data.message) || error,
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
                error: (error.response && error.response.data.message) || error,
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
                error: (error.response && error.response.data.message) || error,
            };
        });
};

