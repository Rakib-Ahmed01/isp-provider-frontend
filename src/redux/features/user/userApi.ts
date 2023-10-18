import { AUTH_TOKEN_KEY } from '@/lib/constants';
import { RootState } from '@/redux/store';
import { apiSlice } from '../../api/apiSlice';
import { loggedIn } from '../auth/authSlice';

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => '/profile',
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue.data;
      },
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          // wait for the request to complete
          const result = await queryFulfilled;
          const updatedUser = result.data as User;
          const { token } = (getState() as RootState).auth;

          // setting the response to the local storage
          localStorage.setItem(
            AUTH_TOKEN_KEY,
            JSON.stringify({
              token,
              user: {
                id: updatedUser.id,
                name: updatedUser.name,
                role: updatedUser.role,
                profileImg: updatedUser.profileImg,
              },
            })
          );

          // storing the response in the redux store
          dispatch(
            loggedIn({
              token,
              user: {
                id: updatedUser.id,
                name: updatedUser.name,
                role: updatedUser.role,
                profileImg: updatedUser.profileImg,
              },
            })
          );
        } catch (error) {
          // handle error
          console.log(error);
        }
      },
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue.data;
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserMutation } = userApi;
