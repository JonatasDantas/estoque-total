import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function getApiClient(ctx?: any) {
  const { 'estoque-total.authToken': token } = parseCookies(ctx);

  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
  
  return api;
}

export function setAuthorization(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

