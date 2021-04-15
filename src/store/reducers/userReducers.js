import { defineState } from 'redux-localstore';

const defaultState = {
  loggedIn: false,
  user: {},
};

const initialState = defineState(defaultState)('userReducer');

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        loggedIn: true,
        user: { ...action.payload },
      };
    case 'LOGOUT':
      localStorage.clear();

      return {
        loggedIn: false,
        user: {},
      };

    default: return state;
  }
};

export default userReducer;
