import axios from 'axios';

const createApiInstance = (token) => {
  const instance = axios.create({
    baseURL: '/api',
  });
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return instance;
};

export default createApiInstance;