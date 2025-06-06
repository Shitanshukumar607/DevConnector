import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants";

type RegisterData = {
  fullName: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/users/`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterData) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data: LoginData) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),

    getUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery } = authApi;
