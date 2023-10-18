import { apiSlice } from '@/redux/api/apiSlice';

export const faqsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaqs: builder.query({
      query: () => '/faqs',
      transformResponse: (baseQueryReturnValue: any) => {
        return baseQueryReturnValue.data;
      },
      providesTags: ['Faq'],
    }),
    getAFaq: builder.query({
      query: (id: string) => `/faqs/${id}`,
      transformResponse: (baseQueryReturnValue: any) => {
        return baseQueryReturnValue.data;
      },
      providesTags: ['Faq'],
    }),
    addFaq: builder.mutation({
      query: (body: any) => ({
        url: '/faqs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Faq'],
    }),

    updateFaq: builder.mutation({
      query: (body: any) => ({
        url: `/faqs/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Faq'],
    }),
    deleteFaq: builder.mutation({
      query: (id: string) => ({
        url: `/faqs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Faq'],
    }),
  }),
});

export const {
  useGetAllFaqsQuery,
  useGetAFaqQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqsApi;
