import { apiSlice } from '@/redux/api/apiSlice';

const plansApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: (size: number) => `/plans?size=${size}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue?.data;
      },
    }),
    getPlan: builder.query<Plan, string>({
      query: (id: string) => `/plans/${id}`,
      transformResponse(baseQueryReturnValue: any, meta, arg) {
        return baseQueryReturnValue?.data;
      },
    }),
  }),
});

export const { useGetPlansQuery, useGetPlanQuery } = plansApi;
