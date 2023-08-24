import authApi from '../api/authApi';

const authUtils = {
  //JWT チェック
  isAuthenticated: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const res = await authApi.verifyToken();
      console.log('authUtils 成功');
      return res.user;
    } catch {
      console.log('authUtils 失敗');
      return false;
    }
  },
};

export default authUtils;
