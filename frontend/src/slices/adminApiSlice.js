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
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/dashboard/${userId}`,
        method: "DELETE",
      }),
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/dashboard/${userId}/block`,
        method: "PATCH",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAdminLoginMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
} = adminApiSlice;
