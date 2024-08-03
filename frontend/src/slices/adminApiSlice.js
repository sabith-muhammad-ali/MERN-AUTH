// adminApiSlice.js
import { apiSlice } from './apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: '/admin/login',  // Correct path
        method: 'POST',
        body: credentials,
      }),
    }),
    // other endpoints...
  }),
  overrideExisting: false,
});

export const { useAdminLoginMutation } = adminApiSlice;
