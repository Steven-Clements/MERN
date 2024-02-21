/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { createSlice } from '@reduxjs/toolkit';

/* ~ ~ ~ ~ ~ Initialize State ~ ~ ~ ~ ~ */
const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  loading: false,
  error: null
};

/* ~ ~ ~ ~ ~ Create Slice ~ ~ ~ ~ ~ */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    }
  }
});

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;
