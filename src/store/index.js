import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { homeReducer, loanCoperationMemberReducer, miscReducer, productReducer, profileReducer, pulsaReducer, registerReducer, savingCoperationMemberReducer, storeProductReducer, topUpReducer } from './reducers';

const reducer = combineReducers({
  pulsaReducer,
  homeReducer,
  registerReducer,
  topUpReducer,
  profileReducer,
  miscReducer,
  savingCoperationMemberReducer,
  loanCoperationMemberReducer,
  storeProductReducer,
  productReducer
});

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
