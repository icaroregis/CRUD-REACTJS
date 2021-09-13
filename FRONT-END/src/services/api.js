import axios from 'axios';

const api = axios.create({
  baseURL: 'https://private-5b8666-testefrontendpc4.apiary-mock.com',
});

export default api;
