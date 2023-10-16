import { apiSlice } from '../api/apiSlice';

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (endpoints) => ({
    getOrdersByUser: endpoints.query({
      query: () => `/orders/user/`,

      transformResponse: (baseQueryReturnValue: any) => {
        return baseQueryReturnValue.data;
      },
    }),
    deleteOrder: endpoints.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetOrdersByUserQuery, useDeleteOrderMutation } = ordersApi;
