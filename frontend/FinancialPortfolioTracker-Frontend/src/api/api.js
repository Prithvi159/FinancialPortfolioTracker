import axios from 'axios';

const createApiInstance = (token) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://financialportfoliotracker-v5d8.onrender.com",
  });

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return instance;
};

export default createApiInstance;