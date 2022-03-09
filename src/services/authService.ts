import { LoginCredentials } from 'src/components/Login/components/LoginForm';
import { LoginResponse } from 'src/types/auth';
import { getApiClient } from './api';

const LOGIN_URL = 'auth/login';
const VALIDATE_TOKEN_URL = 'user/validate-token';

export async function loginRequest(credentials: LoginCredentials) : Promise<LoginResponse> {
  const { data } = await getApiClient().post<LoginResponse>(LOGIN_URL, { ...credentials });

  return data;
}

export async function validateToken(ctx?: any) : Promise<boolean> {
  try {
    const { data } = await getApiClient(ctx).get<boolean>(VALIDATE_TOKEN_URL);

    return data;
  } catch (err: any) {
    return false;
  }
}