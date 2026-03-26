const ENV = {
  dev: {
    // If using Android Emulator, use 'http://10.0.2.2:3000/api'
    // If using physical device, use your PC's IP: 'http://192.168.x.x:3000/api'
    //physical device w usb debugging: 'http://localhost:3000/api'
    API_URL: 'http://localhost:3000/api' 
  },
  
  prod: {
    // Replace with your actual deployed backend URL (Render, Railway, etc.)
    API_URL: 'https://setwemu-backend.onrender.com/api', 
  },
};

const getEnv = () => {
  return __DEV__ ? ENV.dev : ENV.prod;
};

export const API_CONFIG = getEnv();
export const API_URL = API_CONFIG.API_URL;

export default API_CONFIG;