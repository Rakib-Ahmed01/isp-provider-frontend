import { apiSlice } from '../api/apiSlice';

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => '/profile',
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue.data;
      },
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue.data;
      },
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserMutation } = userApi;
