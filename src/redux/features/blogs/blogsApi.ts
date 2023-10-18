import { apiSlice } from '@/redux/api/apiSlice';

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => '/blogs',
      transformResponse: (baseQueryReturnValue: any) => {
        return baseQueryReturnValue.data;
      },
      providesTags: ['Blog'],
    }),
    getABlog: builder.query({
      query: (id: string) => `/blogs/${id}`,
      transformResponse: (baseQueryReturnValue: any) => {
        return baseQueryReturnValue.data;
      },
      providesTags: ['Blog'],
    }),
    addBlog: builder.mutation({
      query: (body: any) => ({
        url: '/blogs',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Blog'],
    }),

    updateBlog: builder.mutation({
      query: (body: any) => ({
        url: `/blogs/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Blog'],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetABlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
