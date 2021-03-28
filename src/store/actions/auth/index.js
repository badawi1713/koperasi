// import {Api} from '../../../helpers';
import { REACT_APP_API_URL } from '@env';
import axios from 'axios';
import {
  setAccessToken,
  setStorageObjectData
} from '../../../helpers/asyncStorage';
import * as RootNavigation from '../../../helpers/RootNavigation';
import { SET_AUTH } from '../../constants';

const baseURL = REACT_APP_API_URL;

export const login = (data) => {
  return async (dispatch) => {
    await dispatch({
      type: SET_AUTH,
      payload: {
        loading: true,
      },
    });

    await axios
      .post(`${baseURL}api/authenticate`, data)
      .then((response) => {
        dispatch({
          type: SET_AUTH,
          payload: {
            loading: false,
            error: false,
          },
        });
        setAccessToken(response.data.jwt);
        setStorageObjectData('userInfo', response.data.user);
        RootNavigation.navigate('MainApp');
      })
      .catch((error) => {
        console.log('Error', error);
        dispatch({
          type: SET_AUTH,
          payload: {
            loading: false,
            error: true,
          },
        });
      });
  };
};

export const changeAuth = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_AUTH,
      payload: data,
    });
  };
};
