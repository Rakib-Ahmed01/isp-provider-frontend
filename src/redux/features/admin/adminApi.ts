import { apiSlice } from '@/redux/api/apiSlice';

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users?role=user',
      transformResponse: (baseQueryReturnValue: any) =>
        baseQueryReturnValue.data,
    }),
    getAdmins: builder.query({
      query: () => '/users?role=admin',
      transformResponse: (baseQueryReturnValue: any) =>
        baseQueryReturnValue.data,
    }),
  }),
});

export const { useGetUsersQuery, useGetAdminsQuery } = adminApi;
