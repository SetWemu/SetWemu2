import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Prevents "Login Flash"

  // 1. Check disk on app startup
  useEffect(() => {
    const loadUserFromDisk = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user_data');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Failed to load user:", e);
      } finally {
        setIsLoading(false); // Done checking
      }
    };
    loadUserFromDisk();
  }, []);

  // 2. Helper: Save to RAM AND Disk
  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
  };

  // 3. Helper: Clear RAM AND Disk
  const logout = async () => {
    setUser(null);
    // Remove both the user data AND the API token
  await Promise.all([
    AsyncStorage.removeItem('user_data'),
    AsyncStorage.removeItem('userToken')
  ]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);