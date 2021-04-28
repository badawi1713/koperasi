import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { homeReducer, indihomeReducer, loanCoperationMemberReducer, miscReducer, pdamReducer, plnReducer, productReducer, profileReducer, pulsaReducer, registerReducer, saldoDetailReducer, savingCoperationMemberReducer, storeProductReducer, topUpReducer } from './reducers';

const reducer = combineReducers({
  saldoDetailReducer,
  pulsaReducer,
  homeReducer,
  registerReducer,
  topUpReducer,
  profileReducer,
  miscReducer,
  savingCoperationMemberReducer,
  loanCoperationMemberReducer,
  storeProductReducer,
  productReducer,
  plnReducer,
  pdamReducer,
  indihomeReducer
});

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
