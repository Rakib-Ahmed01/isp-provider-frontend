import { AUTH_TOKEN_KEY } from '@/lib/constants';
import {
  LoginUserType,
  RegisterUserType,
} from '@/lib/validations/auth-validators';
import { apiSlice } from '@/redux/api/apiSlice';
import jwt_decode from 'jwt-decode';
import { AuthState, loggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<any, RegisterUserType & { profileImg: string }>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<{ data: { token: string } }, LoginUserType>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // wait for the request to complete
          const result = await queryFulfilled;

          const { token } = result.data.data;

          const userData = jwt_decode(token) as AuthState['user'];

          // setting the response to the local storage
          localStorage.setItem(
            AUTH_TOKEN_KEY,
            JSON.stringify({
              token,
              user: {
                id: userData.id,
                name: userData.name,
                role: userData.role,
                profileImg: userData.profileImg,
              },
            })
          );

          // storing the response in the redux store
          dispatch(
            loggedIn({
              token: token,
              user: {
                id: userData.id,
                name: userData.name,
                role: userData.role,
                profileImg: userData.profileImg,
              },
            })
          );
        } catch (error) {
          // handle error
          console.log(error);
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
