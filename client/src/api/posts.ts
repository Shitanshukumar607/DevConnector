import axios from "@/api/axios";

type PostInput = {
  title: string;
  description: string;
};

type PostsParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const getPosts = async (params?: PostsParams) => {
  const searchParams = new URLSearchParams();
  
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.search) searchParams.append('search', params.search);
  
  const response = await axios.get(`/posts?${searchParams.toString()}`);
  return response.data;
};

export const getPostById = async (id: string) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data: PostInput) => {
  const response = await axios.post("/posts", data);
  return response.data;
};

export const likePost = async (postId: string) => {
  const response = await axios.post(`/posts/${postId}/like`);
  return response.data;
};

export const dislikePost = async (postId: string) => {
  const response = await axios.post(`/posts/${postId}/dislike`);
  return response.data;
};

export const addCommentToPost = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
  const response = await axios.post(`/posts/${postId}/comments`, {
    content,
  });
  return response.data;
};
