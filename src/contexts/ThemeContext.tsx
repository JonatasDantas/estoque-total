import { createContext, FunctionComponent, useState } from 'react';

type ThemeContextType = {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  webOpen: boolean;
  setWebOpen: (value: boolean) => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [webOpen, setWebOpen] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ mobileOpen, setMobileOpen, webOpen, setWebOpen }}>
      {children}
    </ThemeContext.Provider>
  );
};