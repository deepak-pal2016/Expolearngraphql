/* eslint-disable @typescript-eslint/no-unused-vars */
import { showSuccess } from '@components/Flashmessge';
import { LocalStorage } from '@helpers/localstorage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.data = action.payload;
    },
    logout: state => {
      state.data = null;

    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
