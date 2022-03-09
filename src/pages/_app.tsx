import 'src/styles/global.scss';
import type { AppProps } from 'next/app';
import { AuthProvider } from 'src/contexts/AuthContext';
import Router from 'next/router';
import { getApiClient } from 'src/services/api';
import AppLayout from 'src/layouts/AppLayout';
import { ThemeProvider } from 'src/contexts/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {

  function handleUnauthorizedUser() {
    Router.push('/');
  }

  getApiClient().interceptors.response.use(undefined, (err) => {
    if ([401, 403].indexOf(err.response.status) !== -1 && !err.response.config.url.includes('auth')) {
      handleUnauthorizedUser();
    }

    return Promise.reject(err);
  });

  return (
    <div>
      <AuthProvider>
        <ThemeProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
