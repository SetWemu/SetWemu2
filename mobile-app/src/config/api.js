const ENV = {
  // Development (Local PC via USB/ADB)
  dev: {
    API_URL: 'http://localhost:3000/api' 
  },
  
  // Production (For when deploying to Render/Railway)
  prod: {
    API_URL: 'https://setwemu-api.onrender.com/api', 
  },
};

const getEnv = () => {
  // __DEV__ is true when running locally via Metro
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export const API_CONFIG = getEnv();
export const API_URL = API_CONFIG.API_URL;

export default API_CONFIG;