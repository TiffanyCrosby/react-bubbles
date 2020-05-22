import axios from 'axios';

const token = localStorage.getItem('token');

export const axiosWithAuth = () => {
  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: 'http://localhost:5000',
  });
};
