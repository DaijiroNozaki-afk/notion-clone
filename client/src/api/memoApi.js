import axiosClient from './axiosClient';

const memoApi = {
  create: (params) => axiosClient.post('memo'),
  getAll: (params) => axiosClient.get('memo'),
};

export default memoApi;
