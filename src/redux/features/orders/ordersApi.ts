import { apiSlice } from '../../api/apiSlice';

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByUser: builder.query({
      query: () => `/orders/user/`,
      transformResponse: (baseQueryReturnValue: any) => {
        return baseQueryReturnValue.data;
      },
      providesTags: ['Order'],
    }),
    getAllOrders: builder.query({
      query: () => `/orders`,
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue.data;
      },
      providesTags: ['Order'],
    }),
    updateOrder: builder.mutation({
      query: (body) => ({
        url: `/orders/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrdersByUserQuery,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} = ordersApi;
