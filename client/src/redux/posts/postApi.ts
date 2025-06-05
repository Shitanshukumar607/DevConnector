import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";

export const postApi = createApi({
  reducerPath: "postApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/posts/`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "",
    }),

    createPost: builder.mutation({
      query: (data: { title: string; description: string }) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),

    updatePost: builder.mutation({
      query: (data: { id: string; title: string; description: string }) => ({
        url: `${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
