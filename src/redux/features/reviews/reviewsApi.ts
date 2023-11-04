import { apiSlice } from '@/redux/api/apiSlice';

const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<
      any,
      {
        comment: string;
        rating: number;
        planId: string;
      }
    >({
      query: (body) => ({
        url: `/plans/${body.planId}/reviews`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Review', 'Plan'],
    }),

    getAllReviews: builder.query({
      query: () => `/plans/reviews`,
      transformResponse: (baseQueryReturnValue: any) => {
        return baseQueryReturnValue.data;
      },
      providesTags: ['Review', 'Plan'],
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewsQuery } = reviewsApi;
