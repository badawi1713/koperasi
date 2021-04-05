/* config untuk API yang global / bisa dipake disemua module, api ini dipanggil 
di actions/global/index.js */
import { REACT_APP_API_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

// main config axios
export const Api = axios.create({
  baseURL: "http://128.199.102.215:8001/",
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
)

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
