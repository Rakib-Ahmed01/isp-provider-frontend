import { apiSlice } from '@/redux/api/apiSlice';

const plansApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: (size: number) => `/plans?size=${size}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ['Plan'],
    }),
    getPlan: builder.query<Plan, string>({
      query: (id: string) => `/plans/${id}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ['Plan'],
    }),
    updatePlan: builder.mutation({
      query: (body) => ({
        url: `/plans/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Plan'],
    }),
    deletePlan: builder.mutation({
      query: (id: string) => ({
        url: `/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plan'],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApi;
