import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import storeSynchronize from 'redux-localstore';
import userReducer from './reducers/userReducers';

const rootReducer = combineReducers({
  userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

storeSynchronize(store);

export default store;
