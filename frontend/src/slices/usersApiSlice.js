/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

/* ~ ~ ~ ~ ~ Create and Export Slice ~ ~ ~ ~ ~ */
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: 'GET'
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'GET'
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Users']
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    }),
  })
});

/* ~ ~ ~ ~ ~ Export Query ~ ~ ~ ~ ~ */
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileMutation, useGetUsersQuery, useGetUserDetailsQuery, useUpdateUserMutation, useDeleteUserMutation } = usersApiSlice;
