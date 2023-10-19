import { apiSlice } from '@/redux/api/apiSlice';

const plansApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPlan: builder.mutation({
      query: (body) => ({
        url: '/plans',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Plan'],
    }),
    getPlans: builder.query({
      query: (params: { size: number; page: number }) =>
        `/plans?size=${params.size}&page=${params?.page || 1}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return {
          data: baseQueryReturnValue?.data,
          meta: baseQueryReturnValue?.meta,
        };
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
  useAddPlanMutation,
} = plansApi;
