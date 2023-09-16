import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import memoReducer from './features/memoSlice';
import favoriteReducer from './features/favoriteSlice';
import trashReducer from './features/trashSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
    favoriteMemo: favoriteReducer,
    trashMemo: trashReducer,
  },
});
