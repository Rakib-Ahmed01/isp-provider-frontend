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
  }),
});

export const { useCreateReviewMutation } = reviewsApi;
