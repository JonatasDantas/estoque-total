import React, { useState } from 'react';
import Context from './StoreContext';
import useStorage from '../utils/useStorage';

const StoreProvider = ({ children }) => {
  const [token, setToken] = useStorage('token');
  const [user, setUser] = useStorage('user');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StoreProvider;
