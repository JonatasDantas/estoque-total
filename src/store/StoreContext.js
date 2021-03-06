import { createContext } from 'react';

const StoreContext = createContext({
  mobileOpen: false,
  setMobileOpen: () => {},
  webOpen: true,
  setWebOpen: () => {},
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

export default StoreContext;
