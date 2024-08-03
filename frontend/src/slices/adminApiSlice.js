import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/admin/logout`,
        method: "POST",
      }),
    }),
    getUsers: builder.query({
      query: () => "/admin/dashboard",
    }),
  }),
  overrideExisting: false,
});

export const { useAdminLoginMutation, useGetUsersQuery } = adminApiSlice;
