const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export const setAuthToken = (token) => {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
};

export const getAuthToken = () => localStorage.getItem('token');

export default API_BASE;
