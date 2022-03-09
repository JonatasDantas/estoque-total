import Router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, FunctionComponent, useState } from 'react';
import { LoginCredentials } from 'src/components/Login/components/LoginForm';
import { setAuthorization } from 'src/services/api';
import { loginRequest } from 'src/services/authService';
import { User } from 'src/types/auth';

type AuthContextType = {
  isAuthenticated: () => boolean;
  user: User | null;
  login: (data: LoginCredentials) => Promise<boolean>
  logout: () => void
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = () => !!user;

  async function login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const response = await loginRequest(credentials);

      if (response.token && response.user) {
        setUser(response.user);

        setCookie(undefined, 'estoque-total.authToken', response.token, {
          maxAge: 60 * 60 * 3, // 3 hours
        });

        setAuthorization(response.token);

        Router.push('/home');

        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  async function logout() {
    setUser(null);
    destroyCookie(undefined, 'estoque-total.authToken');
    setAuthorization('');

    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};