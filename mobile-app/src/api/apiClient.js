import axios from 'axios';
import { API_URL } from '../config/api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to every request
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for handling token expiration (401)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        
        if (!refreshToken) {
          // No refresh token, force logout or just reject
          return Promise.reject(error);
        }

        // Attempt to refresh the token
        // We use axios directly to avoid the interceptor loop
        const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken
        });

        if (refreshResponse.status === 200) {
          const { token, session } = refreshResponse.data;
          
          // Save new tokens
          await Promise.all([
            AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token),
            AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, session?.refresh_token || ''),
          ]);

          // Update the original request with the new token and retry
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed (e.g. refresh token expired)
        console.error('Token refresh failed:', refreshError);
        
        // Clear all session data on fatal auth failure
        await Promise.all([
          AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
          AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN),
          AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
        ]);
        
        // Note: We can't easily navigate to Login here, 
        // but clearing storage will trigger App state updates if set up.
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;