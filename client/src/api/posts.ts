import axios from "@/api/axios";

type PostInput = {
  title: string;
  description: string;
};

export const getPosts = async () => {
  const response = await axios.get("/posts");
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
