import { CreateFeedbackInput } from '@/lib/validations/feedback';
import { apiSlice } from '@/redux/api/apiSlice';

export const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation<
      any,
      CreateFeedbackInput & { userId: string }
    >({
      query: (body) => ({
        url: '/feedbacks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Feedback'],
    }),
    getAllFeedbacks: builder.query({
      query: () => ({
        url: '/feedbacks',
        method: 'GET',
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ['Feedback'],
    }),
  }),
});

export const { useCreateFeedbackMutation, useGetAllFeedbacksQuery } =
  feedbackApi;
