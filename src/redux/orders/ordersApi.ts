import { apiSlice } from '../api/apiSlice';

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByUser: builder.query({
      query: () => `/orders/user/`,

      transformResponse: (baseQueryReturnValue: any) => {
        return baseQueryReturnValue.data;
      },
    }),
    getAllOrders: builder.query({
      query: () => `/orders`,
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue.data;
      },
    }),
    updateOrder: builder.mutation({
      query: (body) => ({
        url: `/orders/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetOrdersByUserQuery,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} = ordersApi;
