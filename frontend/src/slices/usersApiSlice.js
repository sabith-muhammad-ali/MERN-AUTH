import { apiSlice } from "./apiSlice";
const USERS_URL = "/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: formData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;
