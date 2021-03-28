import { SET_REGISTER } from '../../constants';

const initialState = {
    loading: false,
    error: false,
    errorMessage: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    codeText: []
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REGISTER:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default registerReducer;
