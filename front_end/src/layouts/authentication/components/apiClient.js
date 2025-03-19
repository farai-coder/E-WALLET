import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Adjust base URL as needed
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
