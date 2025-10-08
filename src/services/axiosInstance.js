
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://remondaraafat-001-site1.rtempurl.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any auth tokens or other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// helper to set or remove authorization header for all requests
export function setAuthToken(token) {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      localStorage.setItem('token', token);
    } catch (err) {
      console.error('Could not save token:', err);
    }
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
    try {
      localStorage.removeItem('token');
    } catch (err) {
      console.error('Could not remove token:', err);
    }
  }
}

// if token exists when app starts, apply it automatically
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('token');
  if (stored) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${stored}`;
  }
}

export default axiosInstance;
