// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './features/sessionSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer
  }
});
