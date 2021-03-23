import axios from 'axios';

const apis = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'access_token'
)}`;

const setToken = (token) => {
  localStorage.setItem('access_token', token);
};

const unsetToken = () => {
  localStorage.removeItem('access_token');
};

export { setToken, unsetToken };
export default apis;
