import {SET_AUTH} from '../../constants';

export const initialState = {
  isLoggedIn: false,
  userId: '10',
  token: '',
  data: {},
  loading: false,
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default authReducer;
