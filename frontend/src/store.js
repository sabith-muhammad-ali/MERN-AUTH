// store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import { adminApiSlice } from './slices/adminApiSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(adminApiSlice.middleware),
  devTools: true,
});

export default store;
