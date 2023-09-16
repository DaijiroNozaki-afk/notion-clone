import axiosClient from './axiosClient';

const memoApi = {
  create: () => axiosClient.post('memo'),
  getAll: () => axiosClient.get('memo'),
  getFavoriteAll: () => axiosClient.get('memo/favorite'),
  getTrashAll: () => axiosClient.get('memo/trash'),
  getOne: (id) => axiosClient.get(`memo/${id}`),
  update: (id, params) => axiosClient.put(`memo/${id}`, params),
  updatePosition: (params) => axiosClient.put('memo', params),
  updateFavoritePosition: (params) =>
    axiosClient.put('memo/favorite/position', params),
  delete: (id) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
