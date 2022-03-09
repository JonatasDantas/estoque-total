/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { FunctionComponent, useContext } from 'react';
import DrawerComponent from 'src/components/Drawer';
import Header from 'src/components/Header';
import { ThemeContext } from 'src/contexts/ThemeContext';

const AppLayout: FunctionComponent = ({ children }) => {
  const { pathname } = useRouter();
  const { webOpen } = useContext(ThemeContext);
  const publicPages: Array<string> = ['/'];

  return publicPages.includes(pathname) ? (
    <>
      { children }
    </>
  ) : (
    <>
      <Header />
      <DrawerComponent />
      <div className={`app ${!webOpen ? 'drawer-web-closed' : ''}`}>
        { children }
      </div>
    </>
  );
};

export default AppLayout;