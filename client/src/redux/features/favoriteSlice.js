import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: [] };

export const favoriteSlice = createSlice({
  name: 'favoriteMemo',
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
