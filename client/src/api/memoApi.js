import axiosClient from './axiosClient';

const memoApi = {
  create: (params) => axiosClient.post('memo'),
};

export default memoApi;
