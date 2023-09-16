import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: [] };

export const trashSlice = createSlice({
  name: 'trashMemo',
  initialState,
  reducers: {
    setTrash: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTrash } = trashSlice.actions;
export default trashSlice.reducer;
