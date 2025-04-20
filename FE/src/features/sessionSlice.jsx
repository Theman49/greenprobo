// features/sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: { 
    code: null,
    name: null,
    isAdmin: false,
    isLogin: false,
   },
  reducers: {
    login: (state, action) => { 
        state.code = action.payload.code,
        state.name = action.payload.name,
        state.isAdmin = action.payload.isAdmin,
        state.isLogin = true
     },
    logout: state => { 
        state.code = null,
        state.name = null,
        state.isAdmin = false,
        state.isLogin = false
     },
  }
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
