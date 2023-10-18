import { apiSlice } from '@/redux/api/apiSlice';

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users?role=user',
      transformResponse: (baseQueryReturnValue: any) =>
        baseQueryReturnValue.data,
      providesTags: ['User'],
    }),
    getAdmins: builder.query({
      query: () => '/users?role=admin',
      transformResponse: (baseQueryReturnValue: any) =>
        baseQueryReturnValue.data,
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery, useGetAdminsQuery } = adminApi;
