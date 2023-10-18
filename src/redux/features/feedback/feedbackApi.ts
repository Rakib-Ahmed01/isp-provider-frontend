import { CreateFeedbackInput } from '@/lib/validations/feedback';
import { apiSlice } from '@/redux/api/apiSlice';

export const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation<
      any,
      CreateFeedbackInput & { userId: string }
    >({
      query: (body) => ({
        url: '/feedback',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Feedback'],
    }),
    getAllFeedbacks: builder.query({
      query: () => ({
        url: '/feedback',
        method: 'GET',
      }),
      providesTags: ['Feedback'],
    }),
  }),
});

export const { useCreateFeedbackMutation, useGetAllFeedbacksQuery } =
  feedbackApi;
