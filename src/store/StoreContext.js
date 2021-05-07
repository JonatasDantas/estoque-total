import { createContext } from 'react';

const StoreContext = createContext({
  mobileOpen: false,
  setMobileOpen: () => {},
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

export default StoreContext;
