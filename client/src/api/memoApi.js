import axiosClient from './axiosClient';

const memoApi = {
  create: (params) => axiosClient.post('memo'),
  getAll: (params) => axiosClient.get('memo'),
  getOne: (id) => axiosClient.get(`memo/${id}`),
};

export default memoApi;
