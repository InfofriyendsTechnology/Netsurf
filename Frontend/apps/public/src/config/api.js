export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/auth`,
  products: `${API_BASE_URL}/products`,
  themes: `${API_BASE_URL}/themes`,
};

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export default API_BASE_URL;
