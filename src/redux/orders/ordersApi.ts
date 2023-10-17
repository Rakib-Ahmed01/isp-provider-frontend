import { apiSlice } from '../api/apiSlice';

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByUser: builder.query({
      query: () => `/orders/user/`,

      transformResponse: (baseQueryReturnValue: any) => {
        return baseQueryReturnValue.data;
      },
    }),
    deleteOrder: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetOrdersByUserQuery, useDeleteOrderMutation } = ordersApi;
