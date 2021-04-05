import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { ToastAndroid } from "react-native";
import { Api } from '../helpers/api';
import { replace } from '../helpers/RootNavigation';
import createDataContext from './createDataContext';

import { Alert } from "react-native";

const showMessage = () => {
  ToastAndroid.show("Sesi login berakhir, silakan login kembali.", ToastAndroid.SHORT);
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload, loading: false };
    case 'signin':
      return Object.assign({}, state, action.payload);
    case 'clear_error_message':
      return { ...state, errorMessage: '', loading: false };

    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const userProfile = await AsyncStorage.getItem('userData')

  if (token) {
    if (jwtDecode(token).exp < Date.now() / 1000) {
      await AsyncStorage.removeItem('token');
      await dispatch({ type: 'signout' });
      await replace('Login');
      await showMessage()

    } else {
      dispatch({ type: 'signin', payload: { token: token, userProfile: JSON.parse(userProfile), loading: false } });

      replace('MainApp');
    }

  } else {
    replace('GetStarted');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signin = (dispatch) => async (data) => {
  await dispatch({
    type: 'signin', payload: {
      loading: true
    }
  });
  try {
    const response = await Api.post('api/authenticate', data);

    await AsyncStorage.setItem('token', response.data.jwt);
    await AsyncStorage.setItem('userData', JSON.stringify(response.data.user))
    dispatch({
      type: 'signin', payload: {
        token: response.data.token,
        userProfile: response.data.user,
        loading: false
      }
    });

    replace('MainApp');
  } catch (err) {
    Alert.alert(
      "Proses Login Gagal",
      err.response.data.rd,
      [
        {
          text: "Tutup",
          style: "cancel",
        },
      ],

    );
    dispatch({
      type: 'add_error',
      payload: 'Terjadi kesalahan ketika melakukan login',
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  replace('Login');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '', userProfile: null, loading: null },
);
