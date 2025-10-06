// src/services/authService.js
import axiosInstance from './axiosInstance';
import { setAuthToken } from './axiosInstance';
import { getUserInfoFromToken } from './tokenUtils'; // make sure this file exists

// REGISTER user (returns token)
export async function registerUser(payload) {
  const response = await axiosInstance.post('/api/Account/register', payload);

  // extract token (some backends wrap it under data.data)
  const token = response?.data?.data ?? response?.data;
  if (token) {
    setAuthToken(token); // saves + sets Authorization header

    // optional: decode token to get user info
    const info = getUserInfoFromToken(token);
    const user = {
      username: info?.username ?? payload.userName ?? null,
      email: info?.email ?? payload.email ?? null,
    };
    localStorage.setItem('user', JSON.stringify(user));
  }

  return response;
}

// LOGIN user (similar to register)
export async function loginUser(payload) {
  const response = await axiosInstance.post('/api/Account/Login', payload);
  const token = response?.data?.data ?? response?.data;

  if (token) {
    setAuthToken(token);

    const info = getUserInfoFromToken(token);
    const user = {
      username: info?.username ?? payload.userName ?? null,
      email: info?.email ?? payload.email ?? null,
    };
    localStorage.setItem('user', JSON.stringify(user));
  }

  return response;
}
