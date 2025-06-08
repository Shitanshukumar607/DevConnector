import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";

export const postApi = createApi({
  reducerPath: "postApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/posts`,
    credentials: "include",
  }),

  tagTypes: ["Post"],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "",
      providesTags: ["Post"],
    }),

    getPostById: builder.query({
      query: (id: string) => `/${id}`,
      providesTags: ["Post"],
    }),

    createPost: builder.mutation({
      query: (data: { title: string; description: string }) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: (data: { id: string; title: string; description: string }) => ({
        url: `/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    likePost: builder.mutation({
      query: (id: string) => ({
        url: `/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),

    dislikePost: builder.mutation({
      query: (id: string) => ({
        url: `/${id}/dislike`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} = postApi;
