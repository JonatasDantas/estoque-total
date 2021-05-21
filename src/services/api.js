import axios from 'axios';

function getLocalToken() {
  return localStorage.getItem('token') ? localStorage.getItem('token').replace(/["']/g, '') : '';
}

export const api = axios.create({
  baseURL: 'http://estoque-total-api.herokuapp.com',
  headers: {
    authorization: `Bearer ${getLocalToken()}`,
  },
});

export function setAuthorization(token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}

export default {
  api,
  setAuthorization,
};
