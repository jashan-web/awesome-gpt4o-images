import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const showcaseAPI = {
  getAll: (params = {}) => {
    return api.get('/showcases', { params });
  },
  
  getById: (id) => {
    return api.get(`/showcases/${id}`);
  },
  
  getImageUrl: (id) => {
    return `${API_BASE_URL}/showcases/${id}/artwork`;
  },
  
  getStats: () => {
    return api.get('/stats');
  },
};

export default api;

