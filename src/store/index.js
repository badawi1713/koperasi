import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { homeReducer, miscReducer, profileReducer, registerReducer, topUpReducer, savingCoperationMemberReducer } from './reducers';

const reducer = combineReducers({
  homeReducer,
  registerReducer,
  topUpReducer,
  profileReducer,
  miscReducer,
  savingCoperationMemberReducer
});

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
