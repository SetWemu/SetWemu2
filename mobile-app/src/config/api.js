const ENV = {
  // When testing on computer (development)
  dev: {
    API_URL: 'http://localhost:5000/api',  // Oneth's local backend
    FIREBASE_API_KEY: 'temp-key',           // Oneth will give real key
    FIREBASE_PROJECT_ID: 'setwemu-dev',
  },
  
  // When app is live (production)
  prod: {
    API_URL: 'https://setwemu-api.onrender.com/api',  // Deployed backend
    FIREBASE_API_KEY: 'temp-key',                       // Real key later
    FIREBASE_PROJECT_ID: 'setwemu-prod',
  },
};

// This function chooses dev or prod automatically
// __DEV__ = true when running on emulator
// __DEV__ = false when app is published
const getEnv = () => {
  if (__DEV__) {
    return ENV.dev;   // Use localhost while testing
  }
  return ENV.prod;    // Use real server when published
};

export const API_CONFIG = getEnv();

export const API_URL = API_CONFIG.API_URL;
export const FIREBASE_API_KEY = API_CONFIG.FIREBASE_API_KEY;
export const FIREBASE_PROJECT_ID = API_CONFIG.FIREBASE_PROJECT_ID;

export default API_CONFIG;
